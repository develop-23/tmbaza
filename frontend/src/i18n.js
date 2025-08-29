import { createI18n } from 'vue-i18n'
import ru from './locales/ru.json'
import en from './locales/en.json'
import tm from './locales/tm.json'


export default createI18n({
locale: localStorage.getItem('lang') || 'ru',
fallbackLocale: 'ru',
messages: { ru, en, tm }
})