import { AdCard } from './AdCard'
import type { Ad } from '@/types/ad'

interface AdGridProps {
  ads: Ad[]
  onBookmark: (id: string) => void
  onView: (ad: Ad) => void
  viewMode: 'grid' | 'list'
  loading?: boolean
}

export function AdGrid({ ads, onBookmark, onView, viewMode, loading }: AdGridProps) {
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              {viewMode === 'grid' ? (
                <div className="bg-muted rounded-lg">
                  <div className="aspect-[4/3] bg-muted rounded-t-lg" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                    <div className="h-3 bg-muted-foreground/20 rounded w-full" />
                    <div className="h-3 bg-muted-foreground/20 rounded w-2/3" />
                    <div className="flex gap-2">
                      <div className="h-5 bg-muted-foreground/20 rounded w-16" />
                      <div className="h-5 bg-muted-foreground/20 rounded w-20" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex gap-4">
                    <div className="w-32 h-20 bg-muted-foreground/20 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                      <div className="h-3 bg-muted-foreground/20 rounded w-full" />
                      <div className="h-3 bg-muted-foreground/20 rounded w-2/3" />
                      <div className="flex gap-2">
                        <div className="h-5 bg-muted-foreground/20 rounded w-16" />
                        <div className="h-5 bg-muted-foreground/20 rounded w-20" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (ads.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold">No ads found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your filters or search terms to find more ads. You can also add new ads to build your collection.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        : "space-y-4"
      }>
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
            onBookmark={onBookmark}
            onView={onView}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  )
}