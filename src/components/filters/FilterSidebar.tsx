import { X, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { FilterOptions } from '@/types/ad'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
}

const filterOptions = {
  industries: [
    'B2B',
    'Shop'
  ],
  angles: [
    'Problem/Lösung', 'Social Proof', 'Dringlichkeit/Knappheit', 'Emotionaler Appell',
    'Bildend', 'Vergleich', 'Testimonial', 'Hinter den Kulissen',
    'Nutzergenerierte Inhalte', 'Saisonal/Trending', 'Feature-Highlight',
    'Markengeschichte', 'Anleitung/Tutorial', 'Vorher/Nachher', 'Community'
  ],
  campaignGoals: [
    'Markenbekanntheit', 'Lead-Generierung', 'Verkauf/Conversion', 'Traffic',
    'Engagement', 'App-Downloads', 'Event-Promotion', 'Retargeting',
    'Kundenbindung', 'Produktlaunch', 'Recruiting', 'Lokale Bekanntheit'
  ],
  adFormats: [
    'Text-Anzeige',
    'Video',
    'Karussell',
    'Bild-Anzeige',
    'HTML 5',
    'Sponsored Message'
  ],
  funnelStages: [
    'Aufmerksamkeit',
    'Überlegung',
    'Conversion',
    'Retargeting'
  ],
  targetGroups: [
    'CMO',
    'HR',
    'IT'
  ]
}

export function FilterSidebar({ isOpen, onClose, filters, onFiltersChange }: FilterSidebarProps) {
  if (!isOpen) return null

  const handleFilterChange = (category: keyof typeof filterOptions, value: string, checked: boolean) => {
    const currentValues = filters[category as keyof FilterOptions] as string[]
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value)
    
    onFiltersChange({
      ...filters,
      [category]: newValues
    })
  }

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({
      ...filters,
      sortBy: sortBy as 'date' | 'engagement' | 'relevance'
    })
  }

  const handleSortOrderChange = (sortOrder: string) => {
    onFiltersChange({
      ...filters,
      sortOrder: sortOrder as 'asc' | 'desc'
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
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
  }

  const getActiveFiltersCount = () => {
    return filters.industries.length + 
           filters.angles.length + 
           filters.campaignGoals.length + 
           filters.adFormats.length +
           filters.funnelStages.length +
           filters.targetGroups.length
  }

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={onClose} />
      
      {/* Sidebar */}
      <Card className="absolute right-0 top-0 h-full w-80 lg:relative lg:w-full lg:h-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Filter</CardTitle>
          <div className="flex items-center gap-2">
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 px-2 text-xs"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Alle löschen
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <ScrollArea className="h-[calc(100vh-120px)] lg:h-auto">
            {/* Sort Options */}
            <div className="space-y-3">
              <h3 className="font-medium text-sm">Sortieren nach</h3>
              <div className="grid grid-cols-2 gap-2">
                <Select value={filters.sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Datum</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="relevance">Relevanz</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filters.sortOrder} onValueChange={handleSortOrderChange}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Neueste</SelectItem>
                    <SelectItem value="asc">Älteste</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Filter Categories */}
            {Object.entries(filterOptions).map(([category, options]) => {
              const categoryTranslations: Record<string, string> = {
                industries: 'Branchen',
                angles: 'Ansätze',
                campaignGoals: 'Kampagnenziele',
                adFormats: 'Anzeigenformate',
                funnelStages: 'Funnel-Stufen',
                targetGroups: 'Zielgruppen'
              }
              
              return (
              <div key={category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">
                    {categoryTranslations[category] || category}
                  </h3>
                  {(filters[category as keyof FilterOptions] as string[]).length > 0 && (
                    <Badge variant="secondary" className="h-5 text-xs">
                      {(filters[category as keyof FilterOptions] as string[]).length}
                    </Badge>
                  )}
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category}-${option}`}
                        checked={(filters[category as keyof FilterOptions] as string[]).includes(option)}
                        onCheckedChange={(checked) => 
                          handleFilterChange(category as keyof typeof filterOptions, option, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`${category}-${option}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
              </div>
            )})}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}