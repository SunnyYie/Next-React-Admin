import { useFlattenedRoutes } from '../../router/hooks/use-flattened-routes'
import { useBoolean, useEvent, useKeyPressEvent } from 'react-use'
import { Empty, Input, type InputRef, Modal, Tag } from 'antd'
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { IconButton, SvgIcon } from '../../components/icon'
import Scrollbar from '../../components/scroll-bar'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
// import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

export default function SearchBar() {
  // const { t } = useTranslation()
  const inputRef = useRef<InputRef>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const flattenedRoutes = useFlattenedRoutes()

  const activeStyle: CSSProperties = {
    border: `1px dashed #00A76F`,
    backgroundColor: 'rgba(0, 167, 111, 0.1)',
  }

  const [search, toggle] = useBoolean(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  const searchResult = useMemo(() => {
    return flattenedRoutes.filter(item => item.key.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, flattenedRoutes])

  // biome-ignore lint/correctness/useExhaustiveDependencies:  在搜索结果变化时重置选中索引
  useEffect(() => {
    setSelectedItemIndex(0)
  }, [searchResult.length])

  const handleMetaK = (event: KeyboardEvent) => {
    if (event.metaKey && event.key === 'k') {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/metaKey
      handleOpen()
    }
  }
  useEvent('keydown', handleMetaK)

  useKeyPressEvent('ArrowUp', event => {
    if (!search) return
    event.preventDefault()
    let nextIndex = selectedItemIndex - 1
    if (nextIndex < 0) {
      nextIndex = searchResult.length - 1
    }
    setSelectedItemIndex(nextIndex)
    scrollSelectedItemIntoView(nextIndex)
  })

  useKeyPressEvent('ArrowDown', event => {
    if (!search) return
    event.preventDefault()
    let nextIndex = selectedItemIndex + 1
    if (nextIndex > searchResult.length - 1) {
      nextIndex = 0
    }
    setSelectedItemIndex(nextIndex)
    scrollSelectedItemIntoView(nextIndex)
  })

  useKeyPressEvent('Enter', event => {
    if (!search || searchResult.length === 0) return
    event.preventDefault()
    const selectItem = searchResult[selectedItemIndex].key
    if (selectItem) {
      handleSelect(selectItem)
      toggle(false)
    }
  })

  useKeyPressEvent('Escape', () => {
    handleCancel()
  })

  const handleOpen = () => {
    toggle(true)
    setSearchQuery('')
    setSelectedItemIndex(0)
  }
  const handleCancel = () => {
    toggle(false)
  }
  const handleAfterOpenChange = (open: boolean) => {
    if (open) {
      // auto focus
      inputRef.current?.focus()
    }
  }

  const scrollSelectedItemIntoView = (index: number) => {
    if (listRef.current) {
      const selectedItem = listRef.current.children[index]
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  const handleHover = (index: number) => {
    if (index === selectedItemIndex) return
    setSelectedItemIndex(index)
  }

  const handleSelect = (key: string) => {
    navigate(key)
    handleCancel()
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <IconButton className="h-8 rounded-xl bg-gray-100 py-2 text-xs font-bold" onClick={handleOpen}>
          <div className="flex items-center justify-center gap-2">
            <SvgIcon icon="ic-search" size="20" />
            <span className="flex h-6 items-center justify-center rounded-md bg-white px-1.5 font-bold text-gray-800">
              {' '}
              ⌘K{' '}
            </span>
          </div>
        </IconButton>
      </div>
      <Modal
        centered
        keyboard
        open={search}
        onCancel={handleCancel}
        closeIcon={false}
        afterOpenChange={handleAfterOpenChange}
        styles={{
          body: {
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }}
        title={
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search..."
            variant="borderless"
            autoFocus
            prefix={<SvgIcon icon="ic-search" size="20" />}
            suffix={
              <IconButton className="h-6 rounded-md bg-gray-100 text-xs" onClick={handleCancel}>
                Esc
              </IconButton>
            }
          />
        }
        footer={
          <div className="flex flex-wrap">
            <div className="flex">
              <Tag color="cyan">↑</Tag>
              <Tag color="cyan">↓</Tag>
              <span>to navigate</span>
            </div>
            <div className="flex">
              <Tag color="cyan">↵</Tag>
              <span>to select</span>
            </div>
            <div className="flex">
              <Tag color="cyan">ESC</Tag>
              <span>to close</span>
            </div>
          </div>
        }
      >
        {searchResult.length === 0 ? (
          <Empty />
        ) : (
          <Scrollbar>
            <div ref={listRef} className="py-2">
              {searchResult.map(({ key, label }, index) => {
                const partsTitle = parse(label, match(label, searchQuery))
                const partsKey = parse(key, match(key, searchQuery))
                return (
                  <StyledListItemButton
                    key={key}
                    style={index === selectedItemIndex ? activeStyle : {}}
                    onClick={() => handleSelect(key)}
                    onMouseMove={() => handleHover(index)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">
                          {partsTitle.map(item => (
                            <span
                              key={item.text}
                              style={{
                                color: item.highlight ? 'black' : 'black',
                              }}
                            >
                              {item.text}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs">
                          {partsKey.map(item => (
                            <span
                              key={item.text}
                              style={{
                                color: item.highlight ? 'black' : 'black',
                              }}
                            >
                              {item.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </StyledListItemButton>
                )
              })}
            </div>
          </Scrollbar>
        )}
      </Modal>
    </>
  )
}

const StyledListItemButton = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  color: gray;
`
