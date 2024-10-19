import React, { Dispatch, SetStateAction } from 'react'
import EmojiPicker from 'emoji-picker-react'

type Props = React.PropsWithChildren<{
  setEmoji: Dispatch<SetStateAction<string>>
  onEmojiChange?: (emoji: string) => void
}>

const EmojiPickerDialog = ({ children, setEmoji, onEmojiChange }: Props) => {
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
                if (onEmojiChange) {
                  onEmojiChange(e.emoji);
                }
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