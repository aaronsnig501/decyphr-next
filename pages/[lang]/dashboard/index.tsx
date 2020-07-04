import { useState, useEffect } from 'react'
import Router from 'next/router'
import withLocale from '../../../i18n/hoc/withLocale'
import useTranslation from '../../../i18n/hooks/useTranslation'
import api from '../../../utils/api'
import DashboardLayout from '../../../components/layout/dashboard'

const Dashboard: React.FC = () => {
  const { locale, t } = useTranslation()
  const [translations, setTranslations] = useState([]);
  const [libraryItems, setLibraryItems] = useState([]);
  const [readingSessions, setReadingSessions] = useState([]);
  const [practiceSessions, setPracticeSessions] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      Router.push('/[lang]/accounts/login', `/${locale}/accounts/login`)
    }
  })

  useEffect(() => {
    getDashboardData()
  }, [])

  const setStateItems = async (response) => {
    await setTranslations(response.translations)
    await setLibraryItems(response.library_items)
    await setReadingSessions(response.reading_sessions)
    await setPracticeSessions(response.practice_sessions)

    localStorage.setItem('library', JSON.stringify(response.library_items))
    localStorage.setItem('translations', JSON.stringify(response.library_items))
    localStorage.setItem('readingsessions', JSON.stringify(response.reading_sessions))
    localStorage.setItem('practicesessions', JSON.stringify(response.practice_sessions))
  }

  const getDashboardData = async () => {
    if (localStorage.getItem('library')
        && localStorage.getItem('translations') 
        && localStorage.getItem('readingsessions') 
        && localStorage.getItem('practicesessions')) 
    {
      await setTranslations(JSON.parse(localStorage.getItem('library')))
      await setLibraryItems(JSON.parse(localStorage.getItem('translations')))
      await setReadingSessions(JSON.parse(localStorage.getItem('readingsessions')))
      await setPracticeSessions(JSON.parse(localStorage.getItem('practicesessions')))
    } else {
      await api('GET', 'dashboard', setStateItems, setErrors, true)
    }
  }

  return (
    <DashboardLayout title="Decyphr Dashboard" pageTitle="Dashboard" pageSubtitle="Welcome to your Decyphr Dashboard">
    </DashboardLayout>
  )
}

export default withLocale(Dashboard)