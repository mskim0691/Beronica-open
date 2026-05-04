import { Brain, Inbox, Sun, FolderTree, ClipboardCheck, Users, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Feature = {
  id: string
  icon: LucideIcon
  anchorId: string
  titleKey: string
  descKey: string
  demoType: 'chat' | 'folder' | 'table' | 'diagram'
  order: number
}

export const FEATURES: Feature[] = [
  {
    id: 'aiMemory',
    icon: Brain,
    anchorId: 'ai-memory',
    titleKey: 'aiMemory',
    descKey: 'aiMemoryDesc',
    demoType: 'chat',
    order: 0,
  },
  {
    id: 'gtdInbox',
    icon: Inbox,
    anchorId: 'gtd-inbox',
    titleKey: 'gtdInbox',
    descKey: 'gtdInboxDesc',
    demoType: 'chat',
    order: 1,
  },
  {
    id: 'dailyReview',
    icon: Sun,
    anchorId: 'daily-review',
    titleKey: 'dailyReview',
    descKey: 'dailyReviewDesc',
    demoType: 'table',
    order: 2,
  },
  {
    id: 'paraStructure',
    icon: FolderTree,
    anchorId: 'para-structure',
    titleKey: 'paraStructure',
    descKey: 'paraStructureDesc',
    demoType: 'folder',
    order: 3,
  },
  {
    id: 'weeklyReview',
    icon: ClipboardCheck,
    anchorId: 'weekly-review',
    titleKey: 'weeklyReview',
    descKey: 'weeklyReviewDesc',
    demoType: 'table',
    order: 4,
  },
  {
    id: 'contactMgmt',
    icon: Users,
    anchorId: 'contact-management',
    titleKey: 'contactMgmt',
    descKey: 'contactMgmtDesc',
    demoType: 'diagram',
    order: 5,
  },
  {
    id: 'localPrivacy',
    icon: Shield,
    anchorId: 'local-privacy',
    titleKey: 'localPrivacy',
    descKey: 'localPrivacyDesc',
    demoType: 'diagram',
    order: 6,
  },
]
