import React, { Component } from 'react'
import styled from 'styled-components'

import { PlayButton, ProgressBar } from '../controls'
import MediaWrap from '../wrap'
import { getUrlPath, imageProxy } from '../../../../utils'

const Audio = styled.audio`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  ${({ autoPlay }) =>
    autoPlay &&
    `
    &::media-controls-start-playback-button {
      display: none;
      appearance: none;
    }
  `};
`

const Source = styled.source``

class CardVideo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playing: props.autoPlay,
      progress: 0
    }
  }

  togglePlayback = event => {
    if (this.props.controls) {
      event.preventDefault()
      this.setState(({ playing }) => {
        const action = !playing ? 'play' : 'pause'
        this.audio[action]()
        return { playing: !playing }
      })
    }
  }

  updateProgress = () => {
    const progress = this.audio.currentTime / this.audio.duration * 100
    this.setState({ progress })
  }

  render () {
    const {
      autoPlay,
      cardSize,
      controls,
      image,
      loading,
      loop,
      muted,
      playsInline,
      audio,
      ...props
    } = this.props

    const { playing, progress } = this.state
    const src = getUrlPath(audio)
    const type = `audio/${audio.type}`

    return (
      <MediaWrap
        className='microlink_card__media_audio_wrapper'
        cardSize={cardSize}
        loading={loading}
        image={imageProxy(image)}
        onClick={this.togglePlayback}
        {...props}
      >
        <Audio
          className='microlink_card__media microlink_card__media_audio'
          ref={node => (this.audio = node)}
          {...(controls ? { onTimeUpdate: this.updateProgress } : {})}
        >
          <Source src={src} type={type} />
          >
        </Audio>
        <PlayButton cardSize={cardSize} visible={controls && !playing} />
        {controls && (
          <ProgressBar
            cardSize={cardSize}
            progress={progress}
            playing={playing}
          />
        )}
      </MediaWrap>
    )
  }
}

export default CardVideo
