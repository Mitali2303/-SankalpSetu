"use client"

// Custom React hooks for API integration
import { useState, useEffect } from "react"
import { DatabaseService } from "@/lib/api"

export function useBusinessIdeas(userId: string) {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const userIdeas = await DatabaseService.getUserIdeas(userId)
        setIdeas(userIdeas)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchIdeas()
    }
  }, [userId])

  return { ideas, loading, error, refetch: () => fetchIdeas() }
}

export function useSchemeMatches(userId: string) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMatches() {
      try {
        const schemeMatches = await DatabaseService.getSchemeMatches(userId)
        setMatches(schemeMatches)
      } catch (err) {
        console.error("Failed to fetch scheme matches:", err)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchMatches()
    }
  }, [userId])

  return { matches, loading }
}

export function useLearningProgress(userId: string) {
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProgress() {
      try {
        const userProgress = await DatabaseService.getUserProgress(userId)
        setProgress(userProgress)
      } catch (err) {
        console.error("Failed to fetch learning progress:", err)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchProgress()
    }
  }, [userId])

  const updateProgress = async (moduleId: string, progressValue: number) => {
    try {
      await DatabaseService.updateLearningProgress(userId, moduleId, progressValue)
      setProgress((prev) => ({
        ...prev,
        [moduleId]: progressValue,
      }))
    } catch (err) {
      console.error("Failed to update progress:", err)
    }
  }

  return { progress, loading, updateProgress }
}
