import { X, Heart, Bookmark, Share2, ExternalLink, Download, Copy } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Ad } from '@/types/ad'

interface AdDetailModalProps {
  ad: Ad | null
  isOpen: boolean
  onClose: () => void
  onBookmark: (id: string) => void
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

export function AdDetailModal({ ad, isOpen, onClose, onBookmark }: AdDetailModalProps) {
  if (!ad) return null

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: ad.title,
        text: ad.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(ad.description)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = ad.imageUrl
    link.download = `${ad.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`
    link.click()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Image Section */}
          <div className="relative bg-muted">
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
            
            {/* Platform Badge */}
            <Badge className={`absolute top-4 left-4 ${platformColors[ad.platform]}`}>
              {platformIcons[ad.platform]} {ad.platform}
            </Badge>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownload}
                className="bg-white/90 hover:bg-white"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onBookmark(ad.id)}
                className="bg-white/90 hover:bg-white"
              >
                <Bookmark className={`h-4 w-4 ${ad.isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="text-xl font-semibold leading-tight">
                  {ad.title}
                </DialogTitle>
                <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <ScrollArea className="flex-1 px-6">
              <div className="space-y-6 pb-6">
                {/* Brand Info */}
                {ad.brandName && (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://logo.clearbit.com/${ad.brandName.toLowerCase()}.com`} />
                      <AvatarFallback>{ad.brandName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{ad.brandName}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(ad.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Anzeigentext</h3>
                    <Button variant="ghost" size="sm" onClick={handleCopyText}>
                      <Copy className="h-4 w-4 mr-2" />
                      Kopieren
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed">{ad.description}</p>
                </div>

                <Separator />

                {/* Campaign Details */}
                <div className="space-y-4">
                  <h3 className="font-medium">Kampagnen-Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Branche</p>
                      <Badge variant="outline" className="mt-1">{ad.industry}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Kampagnenziel</p>
                      <Badge variant="outline" className="mt-1">{ad.campaignGoal}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Ansatz</p>
                      <Badge variant="outline" className="mt-1">{ad.angle}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Format</p>
                      <Badge variant="outline" className="mt-1">{ad.adFormat}</Badge>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {(ad.ctaText || ad.targetAudience || ad.engagementScore) && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-medium">Zusätzliche Informationen</h3>
                      {ad.ctaText && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Call-to-Action</p>
                          <p className="text-sm mt-1 font-medium">{ad.ctaText}</p>
                        </div>
                      )}
                      {ad.targetAudience && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Zielgruppe</p>
                          <p className="text-sm mt-1">{ad.targetAudience}</p>
                        </div>
                      )}
                      {ad.engagementScore && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Engagement-Score</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${ad.engagementScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{ad.engagementScore}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Tags */}
                {ad.tags.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">Tags</h3>
                      <div className="flex flex-wrap gap-1">
                        {ad.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>

            {/* Action Bar */}
            <div className="border-t p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Gefällt mir
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Teilen
                  </Button>
                </div>
                <Button size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Original anzeigen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}