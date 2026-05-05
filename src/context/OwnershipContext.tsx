import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, getSessionId } from '../lib/supabase';

interface OwnedGame {
  slug: string;
  name: string;
  ownedDate: string;
}

interface OwnershipContextValue {
  ownedGames: Map<string, OwnedGame>;
  isLoading: boolean;
  markOwned: (slug: string, name: string) => Promise<void>;
  unmarkOwned: (slug: string) => Promise<void>;
  isOwned: (slug: string) => boolean;
  getOwnedDate: (slug: string) => string | null;
}

const OwnershipContext = createContext<OwnershipContextValue | null>(null);

export function OwnershipProvider({ children }: { children: React.ReactNode }) {
  const [ownedGames, setOwnedGames] = useState<Map<string, OwnedGame>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = getSessionId();

  const fetchOwned = useCallback(async () => {
    const { data, error } = await supabase
      .from('game_ownership')
      .select('game_slug, game_name, owned_date')
      .eq('user_session_id', sessionId);

    if (!error && data) {
      const map = new Map<string, OwnedGame>();
      for (const row of data) {
        map.set(row.game_slug, {
          slug: row.game_slug,
          name: row.game_name,
          ownedDate: row.owned_date,
        });
      }
      setOwnedGames(map);
    }
    setIsLoading(false);
  }, [sessionId]);

  useEffect(() => {
    void fetchOwned();
  }, [fetchOwned]);

  const markOwned = useCallback(async (slug: string, name: string) => {
    const today = new Date().toISOString().split('T')[0];
    const { error } = await supabase.from('game_ownership').upsert(
      {
        game_slug: slug,
        game_name: name,
        owned_date: today,
        user_session_id: sessionId,
      },
      { onConflict: 'game_slug,user_session_id', ignoreDuplicates: false }
    );
    if (!error) {
      setOwnedGames((prev) => {
        const next = new Map(prev);
        next.set(slug, { slug, name, ownedDate: today });
        return next;
      });
    }
  }, [sessionId]);

  const unmarkOwned = useCallback(async (slug: string) => {
    const { error } = await supabase
      .from('game_ownership')
      .delete()
      .eq('game_slug', slug)
      .eq('user_session_id', sessionId);
    if (!error) {
      setOwnedGames((prev) => {
        const next = new Map(prev);
        next.delete(slug);
        return next;
      });
    }
  }, [sessionId]);

  const isOwned = useCallback((slug: string) => ownedGames.has(slug), [ownedGames]);

  const getOwnedDate = useCallback(
    (slug: string) => ownedGames.get(slug)?.ownedDate ?? null,
    [ownedGames]
  );

  return (
    <OwnershipContext.Provider value={{ ownedGames, isLoading, markOwned, unmarkOwned, isOwned, getOwnedDate }}>
      {children}
    </OwnershipContext.Provider>
  );
}

export function useOwnership() {
  const ctx = useContext(OwnershipContext);
  if (!ctx) throw new Error('useOwnership must be used inside OwnershipProvider');
  return ctx;
}
