import { useQuery } from 'react-query'
import ContentItem from './ContentItem'
import type { ArenaContent } from './types'
import React from 'react'
import { styled } from '@stitches/react'

type Props = {
  id: string
  width?: number
  height?: number
}

const Wrapper = styled('div', {
  border: '1px solid #d8d8d8',
  borderRadius: '4px',
  position: 'relative',
})

const LogoMark = styled('img', {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '16px',
  height: '16px',
})

const ArenaContentItem = ({ id, width, height }: Props) => {
  const { data, isLoading, error } = useQuery<ArenaContent, Error>(
    ['block', id],
    ({ queryKey: [_, id] }) =>
      fetch(`https://api.are.na/v2/blocks/${id}`).then((res) => res.json()),
  )

  if (isLoading) return <span>Loading...</span>

  if (error) return <span>{'An error has occurred: ' + error.message}</span>

  if (!data) return <span>Missing Data?</span>

  return (
    <Wrapper css={{ width: width, height: height }}>
      <ContentItem item={data} />
      <LogoMark src="https://dev.are.na/assets/arena-mark-a778d5c8fca2b357f25a704124ac568d2c22bc994936c857623d61ac17596e91.svg" />
    </Wrapper>
  )
}

export default ArenaContentItem
