import { useState } from 'react'
import { X, Upload, Link as LinkIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

interface AddAdModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (adData: any) => void
}

const platforms = [
  { value: 'google-ads', label: 'Google Ads' },
  { value: 'bing-ads', label: 'Bing Ads' },
  { value: 'linkedin-ads', label: 'LinkedIn Ads' },
  { value: 'meta-ads', label: 'Meta Ads' },
  { value: 'pinterest-ads', label: 'Pinterest Ads' }
]

const industries = [
  'B2B',
  'Shop'
]

const angles = [
  'Problem/Lösung', 'Social Proof', 'Dringlichkeit/Knappheit', 'Emotionaler Appell',
  'Bildend', 'Vergleich', 'Testimonial', 'Hinter den Kulissen',
  'Nutzergenerierte Inhalte', 'Saisonal/Trending', 'Feature-Highlight',
  'Markengeschichte', 'Anleitung/Tutorial', 'Vorher/Nachher', 'Community'
]

const campaignGoals = [
  'Markenbekanntheit', 'Lead-Generierung', 'Verkauf/Conversion', 'Traffic',
  'Engagement', 'App-Downloads', 'Event-Promotion', 'Retargeting',
  'Kundenbindung', 'Produktlaunch', 'Recruiting', 'Lokale Bekanntheit'
]

const adFormats = [
  'Text-Anzeige',
  'Video',
  'Karussell',
  'Bild-Anzeige',
  'HTML 5',
  'Sponsored Message'
]

const funnelStages = [
  'Aufmerksamkeit',
  'Überlegung',
  'Conversion',
  'Retargeting'
]

const targetGroups = [
  'CMO',
  'HR',
  'IT'
]

export function AddAdModal({ isOpen, onClose, onSubmit }: AddAdModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    platform: '',
    industry: '',
    angle: '',
    campaignGoal: '',
    adFormat: '',
    funnelStage: '',
    targetGroup: '',
    brandName: '',
    ctaText: '',
    targetAudience: '',
    tags: ''
  })
  const [dragActive, setDragActive] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, imageUrl: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const adData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      isBookmarked: false
    }
    
    onSubmit(adData)
    onClose()
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      platform: '',
      industry: '',
      angle: '',
      campaignGoal: '',
      adFormat: '',
      funnelStage: '',
      targetGroup: '',
      brandName: '',
      ctaText: '',
      targetAudience: '',
      tags: ''
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Neue Anzeige hinzufügen</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-[calc(90vh-120px)] px-1">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Anzeigenbild</Label>
            <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as 'upload' | 'url')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Datei hochladen</TabsTrigger>
                <TabsTrigger value="url">Bild-URL</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-4">
                <Card
                  className={`border-2 border-dashed transition-colors ${
                    dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    {formData.imageUrl ? (
                      <div className="space-y-4">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="max-h-32 rounded-lg object-cover"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                        >
                          Bild entfernen
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Bild hier ablegen oder klicken zum Durchsuchen</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, GIF bis zu 10MB</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="url" className="mt-4">
                <div className="space-y-2">
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.imageUrl}
                      onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="max-h-32 rounded-lg object-cover"
                      onError={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Anzeigentitel *</Label>
              <Input
                id="title"
                placeholder="Anzeigentitel eingeben"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform">Plattform *</Label>
              <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Plattform auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Anzeigenbeschreibung *</Label>
            <Textarea
              id="description"
              placeholder="Anzeigentext oder Beschreibung eingeben"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              required
            />
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Branche *</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Branche auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="angle">Kampagnen-Ansatz *</Label>
              <Select value={formData.angle} onValueChange={(value) => handleInputChange('angle', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Ansatz auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {angles.map((angle) => (
                    <SelectItem key={angle} value={angle}>
                      {angle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaignGoal">Kampagnenziel *</Label>
              <Select value={formData.campaignGoal} onValueChange={(value) => handleInputChange('campaignGoal', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Ziel auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {campaignGoals.map((goal) => (
                    <SelectItem key={goal} value={goal}>
                      {goal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adFormat">Anzeigenformat *</Label>
              <Select value={formData.adFormat} onValueChange={(value) => handleInputChange('adFormat', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Format auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {adFormats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="funnelStage">Funnel-Stufe *</Label>
              <Select value={formData.funnelStage} onValueChange={(value) => handleInputChange('funnelStage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Funnel-Stufe auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {funnelStages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetGroup">Zielgruppe *</Label>
              <Select value={formData.targetGroup} onValueChange={(value) => handleInputChange('targetGroup', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Zielgruppe auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {targetGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brandName">Markenname</Label>
              <Input
                id="brandName"
                placeholder="Markenname eingeben"
                value={formData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaText">Call-to-Action</Label>
              <Input
                id="ctaText"
                placeholder="z.B. Mehr erfahren, Jetzt kaufen"
                value={formData.ctaText}
                onChange={(e) => handleInputChange('ctaText', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Zielgruppe</Label>
            <Input
              id="targetAudience"
              placeholder="z.B. Kleinunternehmer, 25-45 Jahre alt"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Tags durch Kommas getrennt eingeben"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.title || !formData.description || !formData.platform || !formData.industry || !formData.angle || !formData.campaignGoal || !formData.adFormat || !formData.funnelStage || !formData.targetGroup}
            >
              Anzeige hinzufügen
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}