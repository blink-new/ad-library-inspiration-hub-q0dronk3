export interface Ad {
  id: string
  title: string
  description: string
  imageUrl: string
  platform: 'linkedin' | 'meta' | 'google' | 'pinterest'
  industry: string
  angle: string
  campaignGoal: string
  adFormat: string
  tags: string[]
  createdAt: string
  userId: string
  isBookmarked: boolean
  engagementScore?: number
  brandName?: string
  ctaText?: string
  targetAudience?: string
}

export interface FilterOptions {
  platforms: string[]
  industries: string[]
  angles: string[]
  campaignGoals: string[]
  adFormats: string[]
  searchQuery: string
  sortBy: 'date' | 'engagement' | 'relevance'
  sortOrder: 'asc' | 'desc'
}