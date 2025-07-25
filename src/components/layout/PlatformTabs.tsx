import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

interface PlatformTabsProps {
  selectedPlatforms: string[]
  onPlatformChange: (platforms: string[]) => void
  adCounts: Record<string, number>
}

const platforms = [
  { id: 'all', name: 'All Platforms', icon: '🌐' },
  { id: 'google-ads', name: 'Google Ads', icon: '🔍' },
  { id: 'bing-ads', name: 'Bing Ads', icon: '🔎' },
  { id: 'linkedin-ads', name: 'LinkedIn Ads', icon: '💼' },
  { id: 'meta-ads', name: 'Meta Ads', icon: '📘' },
  { id: 'pinterest-ads', name: 'Pinterest Ads', icon: '📌' }
]

export function PlatformTabs({ selectedPlatforms, onPlatformChange, adCounts }: PlatformTabsProps) {
  const handleTabChange = (value: string) => {
    if (value === 'all') {
      onPlatformChange([])
    } else {
      onPlatformChange([value])
    }
  }

  const activeTab = selectedPlatforms.length === 0 ? 'all' : selectedPlatforms[0]

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-6 h-auto p-1 bg-muted/50">
            {platforms.map((platform) => (
              <TabsTrigger
                key={platform.id}
                value={platform.id}
                className="flex flex-col items-center gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{platform.icon}</span>
                  <span className="font-medium">{platform.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {platform.id === 'all' 
                    ? Object.values(adCounts).reduce((sum, count) => sum + count, 0)
                    : adCounts[platform.id] || 0
                  }
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}