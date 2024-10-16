import React, { Dispatch, SetStateAction } from 'react'
import EmojiPicker from 'emoji-picker-react'

type Props = React.PropsWithChildren<{
  setEmoji: Dispatch<SetStateAction<string>>
}>

const EmojiPickerDialog = ({ children, setEmoji }: Props) => {
  const [openEmojiPicker, setEmojiPicker] = React.useState<boolean>(false)

  return (
    <div>
      <div onClick={() => setEmojiPicker(true)}>
        {children}
      </div>
      {
        openEmojiPicker && (
          <div className='absolute z-10'>
            <EmojiPicker
              open={openEmojiPicker}
              onEmojiClick={(e) => {
                setEmoji(e.emoji)
                setEmojiPicker(false)
              }}
              lazyLoadEmojis
            />
          </div>
        )
      }
    </div>
  )
}

export default EmojiPickerDialog