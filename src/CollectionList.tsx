import { useQuery } from 'react-query'
import React from 'react'
import LazyLoad from 'react-lazyload'
import type { ArenaCollectionResponse } from './types'
import ContentItem from './ContentItem'

type Props = {
  id: string
}

type PlaceholderProps = {
  src: string
  height: number
  alt: string
}

const Placeholder = ({ src, height, alt }: PlaceholderProps) => {
  return (
    <LazyLoad
      height={height}
      placeholder={
        <div style={{ height: height + 'px', backgroundColor: 'grey' }} />
      }
    >
      <img src={src} height={height} alt={alt} />
    </LazyLoad>
  )
}

const CollectionList = ({ id }: Props) => {
  const { data, isLoading, error } = useQuery<ArenaCollectionResponse, Error>(
    ['collection', id],
    ({ queryKey: [_, id] }) =>
      fetch(
        `https://api.are.na/v2/channels/${id}/contents?&direction=desc&sort=position`,
      ).then((res) => res.json()),
  )

  if (isLoading) return <span>Loading...</span>

  if (error) return <span>{'An error has occurred: ' + error.message}</span>

  if (!data) return <span>Missing Data?</span>

  return (
    <ul>
      <ContentItem item={data.contents[0]} />
      {data.contents.map((c) => (
        <li key={c.id}>
          <LazyLoad
            height={200}
            once
            unmountIfInvisible
            placeholder={
              <img
                src={c.image.thumb.url}
                height={200}
                alt={c.generated_title}
              />
            }
          >
            <img src={c.image.large.url} height={200} alt={c.generated_title} />
          </LazyLoad>
        </li>
      ))}
    </ul>
  )
}

export default CollectionList
