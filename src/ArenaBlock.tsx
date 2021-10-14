import { useQuery } from 'react-query'
import ContentItem from './ContentItem'
import type { ArenaContent } from './types'
import React from 'react'

type Props = {
  id: string
}

const ArenaContentItem = ({ id }: Props) => {
  const { data, isLoading, error } = useQuery<ArenaContent, Error>(
    ['block', id],
    ({ queryKey: [_, id] }) =>
      fetch(`https://api.are.na/v2/blocks/${id}`).then((res) => res.json()),
  )

  if (isLoading) return <span>Loading...</span>

  if (error) return <span>{'An error has occurred: ' + error.message}</span>

  if (!data) return <span>Missing Data?</span>

  return <ContentItem item={data} />
}

export default ArenaContentItem
