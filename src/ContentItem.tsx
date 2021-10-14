import React from 'react'
import type { ArenaContent } from './types'

type Props = {
  item: ArenaContent
}

const ContentItem = ({ item }: Props) => {
  return (
    <div>
      <img src={item.image.original.url} />
      <ul>
        <li>{item.generated_title}</li>
        <li>{item.description}</li>
        <li>{item.connected_at}</li>
        <li>
          <a href={`https://www.are.na/${item.user.slug}`}>
            {item.user.username}
          </a>
        </li>
        <li>
          {item.source.provider.name}:{' '}
          <a href={item.source.url}>{item.source.title}</a>
        </li>
        {item.embed && (
          <li>
            <div
              style={{
                width: item.embed.width + 'px',
                height: item.embed.height + 'px',
              }}
              dangerouslySetInnerHTML={{ __html: item.embed.html }}
            ></div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ContentItem
