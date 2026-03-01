import { useTranslation } from 'react-i18next'
import { HiOutlineLanguage } from 'react-icons/hi2'
import ButtonIcon from './ButtonIcon'

function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <ButtonIcon onClick={toggleLanguage} title={i18n.language === 'en' ? 'Switch to Chinese' : '切换到英文'}>
      <HiOutlineLanguage />
      <span style={{ marginLeft: '0.4rem', fontSize: '1.2rem' }}>
        {i18n.language === 'en' ? 'EN' : '中'}
      </span>
    </ButtonIcon>
  )
}

export default LanguageToggle
