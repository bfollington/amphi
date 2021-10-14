import { styled } from '@stitches/react'
import React, { useState } from 'react'
import LazyLoad from 'react-lazyload'
import { ArenaContent, getImage } from './types'

type Props = {
  item: ArenaContent
}

const ContentWrapper = styled('div', {
  position: 'relative',
  display: 'inline-block',
})

const InfoButton = styled('button', {
  position: 'absolute',
  right: '8px',
  bottom: '8px',
})

const InfoPanel = styled('div', {
  position: 'absolute',
  overflowY: 'auto',
  right: '8px',
  bottom: '8px',
  minHeight: '128px',
  maxHeight: '50%',
  minWidth: '128px',
  maxWidth: '40%',
  background: 'white',
  borderRadius: '4px',
  border: '1px solid #d8d8d8',
  textAlign: 'left',
  padding: '8px',
})

const MetadataList = styled('dl', { margin: 0, padding: 0 })
const MetadataLabel = styled('dt', {
  width: '50%',
  margin: 0,
  display: 'inline-block',
})
const MetadataValue = styled('dd', {
  width: '50%',
  margin: 0,
  display: 'inline-block',
  textAlign: 'right',
  marginBottom: '4px',
})

const MetadataItem = ({
  label,
  value,
}: {
  label: string
  value: string | JSX.Element
}) => (
  <>
    <MetadataLabel>{label}</MetadataLabel>
    <MetadataValue>{value}</MetadataValue>
  </>
)

const ContentImage = styled('div', {
  backgroundSize: 'contain',
  backgroundColor: 'transparent',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  height: '85vh',
  width: '90vw',
})

const ContentItem = ({ item }: Props) => {
  const [infoVisible, setInfoVisible] = useState(false)

  return (
    <LazyLoad
      height="75%"
      once
      unmountIfInvisible
      placeholder={<div style={{ height: '75%', backgroundColor: 'blue' }} />}
    >
      <ContentWrapper>
        <ContentImage
          css={{ backgroundImage: `url(${getImage(item, 'original')})` }}
        />
        <InfoButton onClick={() => setInfoVisible(true)}>info</InfoButton>
        {infoVisible && (
          <InfoPanel>
            <InfoButton onClick={() => setInfoVisible(false)}>close</InfoButton>
            <MetadataList>
              <MetadataItem label="Title" value={item.generated_title} />
              <MetadataItem label="Description" value={item.description} />
              <MetadataItem label="Connected At" value={item.connected_at} />
              <MetadataItem
                label="Connected By"
                value={
                  <a href={`https://www.are.na/${item.user.slug}`}>
                    {item.user.username}
                  </a>
                }
              />

              {item.source && (
                <MetadataItem
                  label="Source"
                  value={
                    <>
                      {item.source.provider.name}:{' '}
                      <a href={item.source.url}>{item.source.title}</a>
                    </>
                  }
                />
              )}
              {item.embed && (
                <MetadataItem
                  label="Embed"
                  value={
                    <div
                      style={{
                        width: item.embed.width + 'px',
                        height: item.embed.height + 'px',
                      }}
                      dangerouslySetInnerHTML={{ __html: item.embed.html }}
                    ></div>
                  }
                />
              )}
            </MetadataList>
          </InfoPanel>
        )}
      </ContentWrapper>
    </LazyLoad>
  )
}

export default ContentItem
