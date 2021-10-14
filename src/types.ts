export type ArenaUser = {
  id: number
  slug: string
  username: string
  full_name: string
  avatar: string
  avatar_image: {
    thumb: string
    display: string
  }
  channel_count: number
  following_count: number
  profile_id: number
  follower_count: number
}

export type ArenaEmbed = {
  url: string | null
  type: 'rich'
  title: string | null
  author_name: string | null
  author_url: string | null
  source_url: string | null
  thumbnail_url: string | null
  width: number
  height: number
  html: string
}

export function getImage(
  item: ArenaContent,
  key: 'thumb' | 'square' | 'display' | 'large' | 'original',
) {
  return (
    item.image?.[key].url ??
    `https://dev.are.na/assets/arena-mark-a778d5c8fca2b357f25a704124ac568d2c22bc994936c857623d61ac17596e91.svg`
  )
}

export type ArenaContent = {
  id: number
  generated_title: string
  user: ArenaUser
  content: string
  content_html?: string
  description: string
  base_class: 'Block'
  class: 'Image' | 'Text' | 'Attachment' | 'Media'
  embed: ArenaEmbed | null
  attachment: any | null // TODO work out export type
  metadata: any | null // TODO work out export type
  position: number
  connection_id: number
  updated_at: string
  created_at: string
  connected_at: string
  connected_by_user_id: number
  connected_by_username: string
  connected_by_user_slug: string
  source: null | {
    url: string
    title: string
    provider: {
      name: string
      url: string
    }
  }
  image: {
    filename: string
    content_type: string
    updated_at: string
    thumb: {
      url: string
    }
    square: {
      url: string
    }
    display: {
      url: string
    }
    large: {
      url: string
    }
    original: {
      url: string
    }
  }
}

export type ArenaCollectionResponse = {
  contents: ArenaContent[]
}
