import { useState } from 'react'
import { Heart, Bookmark, Share2, ExternalLink, Eye, MoreHorizontal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { Ad } from '@/types/ad'

interface AdCardProps {
  ad: Ad
  onBookmark: (id: string) => void
  onView: (ad: Ad) => void
  viewMode?: 'grid' | 'list'
}

const platformColors = {
  linkedin: 'bg-blue-100 text-blue-800',
  meta: 'bg-blue-100 text-blue-800',
  google: 'bg-green-100 text-green-800',
  pinterest: 'bg-red-100 text-red-800'
}

const platformIcons = {
  linkedin: '💼',
  meta: '📘',
  google: '🔍',
  pinterest: '📌'
}

export function AdCard({ ad, onBookmark, onView, viewMode = 'grid' }: AdCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: ad.title,
        text: ad.description,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => onView(ad)}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Image */}
            <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={platformColors[ad.platform]}>
                      {platformIcons[ad.platform]} {ad.platform}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(ad.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-1 mb-1">{ad.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{ad.description}</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">{ad.industry}</Badge>
                    <Badge variant="outline" className="text-xs">{ad.angle}</Badge>
                    <Badge variant="outline" className="text-xs">{ad.adFormat}</Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsLiked(!isLiked)
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onBookmark(ad.id)
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Bookmark className={`h-4 w-4 ${ad.isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Teilen
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Original anzeigen
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden" onClick={() => onView(ad)}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        
        {/* Platform Badge */}
        <Badge className={`absolute top-3 left-3 ${platformColors[ad.platform]}`}>
          {platformIcons[ad.platform]} {ad.platform}
        </Badge>

        {/* Quick Actions Overlay */}
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onBookmark(ad.id)
            }}
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
          >
            <Bookmark className={`h-4 w-4 ${ad.isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
          >
            <Eye className="h-4 w-4 mr-2" />
            Details anzeigen
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold line-clamp-2 mb-1">{ad.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{ad.description}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Teilen
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Original anzeigen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">{ad.industry}</Badge>
            <Badge variant="outline" className="text-xs">{ad.angle}</Badge>
            <Badge variant="outline" className="text-xs">{ad.adFormat}</Badge>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              {ad.brandName && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={`https://logo.clearbit.com/${ad.brandName.toLowerCase()}.com`} />
                    <AvatarFallback className="text-xs">{ad.brandName[0]}</AvatarFallback>
                  </Avatar>
                  <span>{ad.brandName}</span>
                </div>
              )}
            </div>
            <span>{new Date(ad.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}