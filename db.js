import { useState, useEffect, useCallback } from 'react'
import { getStageClears, getPlayerBadges, getPlayerCoupons } from '../lib/db'

export function usePlayer() {
  const [playerId, setPlayerId] = useState(null)
  const [ageId, setAgeId] = useState(null)
  const [stageClears, setStageClears] = useState([])
  const [badges, setBadges] = useState([])
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ejunkan_player')
      if (saved) {
        const { id, age } = JSON.parse(saved)
        setPlayerId(id)
        setAgeId(age)
      }
    }
  }, [])

  useEffect(() => {
    if (playerId) refreshData()
  }, [playerId])

  const refreshData = useCallback(async () => {
    if (!playerId) return
    setLoading(true)
    try {
      const [clears, bdgs, cpns] = await Promise.all([
        getStageClears(playerId),
        getPlayerBadges(playerId),
        getPlayerCoupons(playerId),
      ])
      setStageClears(clears)
      setBadges(bdgs)
      setCoupons(cpns)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [playerId])

  const savePlayer = useCallback((id, age) => {
    setPlayerId(id)
    setAgeId(age)
    if (typeof window !== 'undefined') {
      localStorage.setItem('ejunkan_player', JSON.stringify({ id, age }))
    }
  }, [])

  const isKid = ageId === 'kid'

  return { playerId, ageId, isKid, stageClears, badges, coupons, loading, savePlayer, refreshData }
}
