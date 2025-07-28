import { useState, useEffect } from 'react'
import { blink } from '@/blink/client'
import { Header } from '@/components/layout/Header'
import { PlatformTabs } from '@/components/layout/PlatformTabs'
import { FilterSidebar } from '@/components/filters/FilterSidebar'
import { AdGrid } from '@/components/ads/AdGrid'
import { AdDetailModal } from '@/components/modals/AdDetailModal'
import { AddAdModal } from '@/components/modals/AddAdModal'
import type { Ad, FilterOptions } from '@/types/ad'

// Sample data for demonstration
const sampleAds: Ad[] = [
  {
    id: '1',
    title: 'Transform Your Business with AI-Powered Analytics',
    description: 'Discover how leading companies are using our AI platform to increase revenue by 40%. Get started with a free 14-day trial and see the difference data-driven decisions can make.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    platform: 'linkedin-ads',
    industry: 'B2B',
    angle: 'Problem/Lösung',
    campaignGoal: 'Lead-Generierung',
    adFormat: 'Bild-Anzeige',
    funnelStage: 'Aufmerksamkeit',
    targetGroup: 'CMO',
    tags: ['AI', 'Analytics', 'B2B', 'SaaS'],
    createdAt: '2024-01-15T10:30:00Z',
    userId: 'user1',
    isBookmarked: false,
    engagementScore: 85,
    brandName: 'DataFlow',
    ctaText: 'Start Free Trial',
    targetAudience: 'Business executives, 35-55 years old'
  },
  {
    id: '2',
    title: 'The Future of E-commerce is Here',
    description: 'Join thousands of online retailers who have increased their sales by 60% with our all-in-one e-commerce platform. Easy setup, powerful features, unlimited growth.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    platform: 'meta-ads',
    industry: 'Shop',
    angle: 'Social Proof',
    campaignGoal: 'Verkauf/Conversion',
    adFormat: 'Karussell',
    funnelStage: 'Conversion',
    targetGroup: 'CMO',
    tags: ['E-commerce', 'Online Store', 'Sales'],
    createdAt: '2024-01-14T15:45:00Z',
    userId: 'user1',
    isBookmarked: true,
    engagementScore: 92,
    brandName: 'ShopifyPlus',
    ctaText: 'Get Started Today',
    targetAudience: 'Small business owners, online entrepreneurs'
  },
  {
    id: '3',
    title: 'Learn Digital Marketing in 30 Days',
    description: 'Master the skills that top marketers use to drive results. Our comprehensive course covers SEO, PPC, social media, and analytics. 95% job placement rate.',
    imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop',
    platform: 'google-ads',
    industry: 'B2B',
    angle: 'Bildend',
    campaignGoal: 'Lead-Generierung',
    adFormat: 'Video',
    funnelStage: 'Überlegung',
    targetGroup: 'HR',
    tags: ['Education', 'Marketing', 'Career'],
    createdAt: '2024-01-13T09:20:00Z',
    userId: 'user1',
    isBookmarked: false,
    engagementScore: 78,
    brandName: 'MarketingPro',
    ctaText: 'Enroll Now',
    targetAudience: 'Career changers, marketing professionals'
  },
  {
    id: '4',
    title: 'Sustainable Fashion That Doesn\'t Cost the Earth',
    description: 'Beautiful, ethically-made clothing that\'s kind to both you and the planet. Use code EARTH20 for 20% off your first order. Free shipping on orders over $75.',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
    platform: 'pinterest-ads',
    industry: 'Shop',
    angle: 'Emotionaler Appell',
    campaignGoal: 'Verkauf/Conversion',
    adFormat: 'Bild-Anzeige',
    funnelStage: 'Aufmerksamkeit',
    targetGroup: 'CMO',
    tags: ['Fashion', 'Sustainable', 'Eco-friendly'],
    createdAt: '2024-01-12T14:10:00Z',
    userId: 'user1',
    isBookmarked: true,
    engagementScore: 88,
    brandName: 'EcoThreads',
    ctaText: 'Shop Collection',
    targetAudience: 'Environmentally conscious consumers, 25-40 years old'
  },
  {
    id: '5',
    title: 'IT Infrastructure Solutions That Scale',
    description: 'Discover cloud solutions that grow with your business. Our expert team has helped over 10,000 companies modernize their IT infrastructure. Schedule your consultation today.',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    platform: 'bing-ads',
    industry: 'B2B',
    angle: 'Testimonial',
    campaignGoal: 'Lead-Generierung',
    adFormat: 'Text-Anzeige',
    funnelStage: 'Überlegung',
    targetGroup: 'IT',
    tags: ['IT', 'Cloud', 'Infrastructure'],
    createdAt: '2024-01-11T11:30:00Z',
    userId: 'user1',
    isBookmarked: false,
    engagementScore: 76,
    brandName: 'CloudTech',
    ctaText: 'Get Consultation',
    targetAudience: 'IT decision makers, enterprise companies'
  },
  {
    id: '6',
    title: 'Recruit Top Talent with AI-Powered Hiring',
    description: 'Join the hiring revolution! Our proven AI platform has helped 50,000+ companies find the perfect candidates 3x faster. Streamline your recruitment process today.',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    platform: 'linkedin-ads',
    industry: 'B2B',
    angle: 'Vorher/Nachher',
    campaignGoal: 'Lead-Generierung',
    adFormat: 'Sponsored Message',
    funnelStage: 'Retargeting',
    targetGroup: 'HR',
    tags: ['HR', 'Recruitment', 'AI'],
    createdAt: '2024-01-10T16:45:00Z',
    userId: 'user1',
    isBookmarked: false,
    engagementScore: 94,
    brandName: 'TalentAI',
    ctaText: 'Start Free Trial',
    targetAudience: 'HR professionals, talent acquisition teams'
  }
]

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [ads, setAds] = useState<Ad[]>(sampleAds)
  const [filteredAds, setFilteredAds] = useState<Ad[]>(sampleAds)
  const [filters, setFilters] = useState<FilterOptions>({
    platforms: [],
    industries: [],
    angles: [],
    campaignGoals: [],
    adFormats: [],
    funnelStages: [],
    targetGroups: [],
    searchQuery: '',
    sortBy: 'date',
    sortOrder: 'desc'
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Auth state management
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = [...ads]

    // Platform filter
    if (filters.platforms.length > 0) {
      filtered = filtered.filter(ad => filters.platforms.includes(ad.platform))
    }

    // Industry filter
    if (filters.industries.length > 0) {
      filtered = filtered.filter(ad => filters.industries.includes(ad.industry))
    }

    // Angle filter
    if (filters.angles.length > 0) {
      filtered = filtered.filter(ad => filters.angles.includes(ad.angle))
    }

    // Campaign goal filter
    if (filters.campaignGoals.length > 0) {
      filtered = filtered.filter(ad => filters.campaignGoals.includes(ad.campaignGoal))
    }

    // Ad format filter
    if (filters.adFormats.length > 0) {
      filtered = filtered.filter(ad => filters.adFormats.includes(ad.adFormat))
    }

    // Funnel stage filter
    if (filters.funnelStages.length > 0) {
      filtered = filtered.filter(ad => filters.funnelStages.includes(ad.funnelStage))
    }

    // Target group filter
    if (filters.targetGroups.length > 0) {
      filtered = filtered.filter(ad => filters.targetGroups.includes(ad.targetGroup))
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(ad => 
        ad.title.toLowerCase().includes(query) ||
        ad.description.toLowerCase().includes(query) ||
        ad.brandName?.toLowerCase().includes(query) ||
        ad.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (filters.sortBy) {
        case 'date':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        case 'engagement':
          aValue = a.engagementScore || 0
          bValue = b.engagementScore || 0
          break
        case 'relevance':
          // Simple relevance based on search query matches
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase()
            aValue = (a.title.toLowerCase().includes(query) ? 2 : 0) + 
                    (a.description.toLowerCase().includes(query) ? 1 : 0)
            bValue = (b.title.toLowerCase().includes(query) ? 2 : 0) + 
                    (b.description.toLowerCase().includes(query) ? 1 : 0)
          } else {
            aValue = a.engagementScore || 0
            bValue = b.engagementScore || 0
          }
          break
        default:
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
      }

      return filters.sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })

    setFilteredAds(filtered)
  }, [ads, filters])

  const handleBookmark = (id: string) => {
    setAds(prev => prev.map(ad => 
      ad.id === id ? { ...ad, isBookmarked: !ad.isBookmarked } : ad
    ))
  }

  const handleAddAd = (adData: any) => {
    const newAd: Ad = {
      ...adData,
      id: Date.now().toString(),
      userId: user?.id || 'anonymous',
      isBookmarked: false
    }
    setAds(prev => [newAd, ...prev])
  }

  const getActiveFiltersCount = () => {
    return filters.industries.length + 
           filters.angles.length + 
           filters.campaignGoals.length + 
           filters.adFormats.length +
           filters.funnelStages.length +
           filters.targetGroups.length
  }

  const getAdCounts = () => {
    const counts: Record<string, number> = {
      'google-ads': 0,
      'bing-ads': 0,
      'linkedin-ads': 0,
      'meta-ads': 0,
      'pinterest-ads': 0
    }
    
    ads.forEach(ad => {
      counts[ad.platform] = (counts[ad.platform] || 0) + 1
    })
    
    return counts
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Lade deine Anzeigen-Bibliothek...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">📚</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Willkommen zur Anzeigen-Bibliothek</h1>
            <p className="text-muted-foreground">
              Bitte melde dich an, um auf deine kreative Inspirations-Zentrale zuzugreifen und Anzeigen von verschiedenen digitalen Plattformen zu sammeln.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => setFilters(prev => ({ ...prev, searchQuery: query }))}
        onAddAd={() => setShowAddModal(true)}
        onToggleFilters={() => setShowFilters(!showFilters)}
        activeFiltersCount={getActiveFiltersCount()}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <PlatformTabs
        selectedPlatforms={filters.platforms}
        onPlatformChange={(platforms) => setFilters(prev => ({ ...prev, platforms }))}
        adCounts={getAdCounts()}
      />

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          <AdGrid
            ads={filteredAds}
            onBookmark={handleBookmark}
            onView={setSelectedAd}
            viewMode={viewMode}
          />
        </div>

        {/* Filter Sidebar */}
        {showFilters && (
          <div className="w-80 border-l bg-background">
            <FilterSidebar
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <AdDetailModal
        ad={selectedAd}
        isOpen={!!selectedAd}
        onClose={() => setSelectedAd(null)}
        onBookmark={handleBookmark}
      />

      <AddAdModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddAd}
      />
    </div>
  )
}

export default App