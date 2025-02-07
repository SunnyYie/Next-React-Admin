import { IconButton, SvgIcon } from './icon'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'

/**
 * Locale Picker
 */
export default function LocalePicker() {
  // const { setLocale, locale } = useLocale()

  // const localeList: MenuProps['items'] = Object.values(LANGUAGE_MAP).map(item => {
  //   return {
  //     key: item.locale,
  //     label: item.label,
  //     icon: <SvgIcon icon={item.icon} size="20" className="rounded-md" />,
  //   }
  // })

  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      // menu={{ items: localeList, onClick: e => setLocale(e.key as Locale) }}
    >
      <IconButton className="h-10 w-10 hover:scale-105">
        <SvgIcon icon={`ic-locale`} size="24" className="rounded-md" />
      </IconButton>
    </Dropdown>
  )
}
