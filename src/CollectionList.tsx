import { useQuery } from 'react-query'
import React, { useCallback, useMemo, useState } from 'react'
import LazyLoad from 'react-lazyload'
import { ArenaCollectionResponse, getImage } from './types'
import ContentItem from './ContentItem'
import Masonry from 'react-masonry-css'
import { styled } from '@stitches/react'
import { shuffle } from './array'
import KEYS from 'use-control/lib/keys'
import { keycode, useButtonPressed } from 'use-control/lib'

type Props = {
  id: string
}

type PlaceholderProps = {
  src: string
  height: number
  alt: string
}

const Wrapper = styled('div', {
  position: 'relative',
  '.arena-masonry-grid': {
    overflowX: 'hidden',
    display: 'flex',
    // marginLeft: '-30px',
    width: 'auto',
  },
})

const FocusItem = styled('div', {
  background: 'rgba(255, 255, 255, 0.75)',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  padding: '64px',
  '& img': {
    maxWidth: '100%',
  },
})

const Button = styled('button', {
  fontFamily: `Arial, "Helvetica Neue", Helvetica, sans-serif`,
  fontSize: `1.5rem`,
  color: `rgb(88, 88, 88)`,
  background: 'white',
  border: `1px solid rgb(222, 222, 222)`,
  padding: `0.65625em 1em`,
})

const inputMap = {
  buttons: {
    left: [keycode(KEYS.left_arrow), keycode(KEYS.h)],
    right: [keycode(KEYS.right_arrow), keycode(KEYS.l)],
  },
  axes: {},
}

const CollectionList = ({ id }: Props) => {
  const { data, isLoading, error } = useQuery<ArenaCollectionResponse, Error>(
    ['collection', id],
    ({ queryKey: [_, id] }) =>
      fetch(
        `https://api.are.na/v2/channels/${id}/contents?&direction=desc&sort=position`,
      ).then((res) => res.json()),
  )

  const [focused, setFocused] = useState(0)
  const items = data?.contents.length ?? 0
  const order = useMemo(
    () => shuffle([...Array(items)].map((_, idx) => idx)),
    [items],
  )

  const onNext = useCallback(() => {
    let next = focused + 1
    if (next >= items) {
      next = 0
    }
    setFocused(next)
  }, [setFocused, focused, items])

  const onPrev = useCallback(() => {
    let next = focused - 1
    if (next < 0) {
      next = items - 1
    }
    setFocused(next)
  }, [setFocused, focused, items])

  useButtonPressed(inputMap, 'left', onPrev)
  useButtonPressed(inputMap, 'right', onNext)

  if (isLoading) return <span>Loading...</span>

  if (error) return <span>{'An error has occurred: ' + error.message}</span>

  if (!data) return <span>Missing Data?</span>

  return (
    <Wrapper>
      <FocusItem>
        <ContentItem item={data.contents[order[focused]]} />
        <Button onClick={onPrev}>← prev</Button>
        <Button onClick={onNext}>next →</Button>
      </FocusItem>
      <Masonry className="arena-masonry-grid" breakpointCols={4}>
        {data.contents.map((c) => (
          <LazyLoad
            key={c.id}
            height={200}
            once
            unmountIfInvisible
            placeholder={
              <img
                src={getImage(c, 'thumb')}
                height={200}
                alt={c.generated_title}
              />
            }
          >
            <img
              src={getImage(c, 'original')}
              height={200}
              alt={c.generated_title}
            />
          </LazyLoad>
        ))}
      </Masonry>
      {/* {data.contents.map((c) => (
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
      ))} */}
    </Wrapper>
  )
}

export default CollectionList
