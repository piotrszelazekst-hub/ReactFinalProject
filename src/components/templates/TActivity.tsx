import AText from '@atoms/AText/AText'
import React from 'react'
import './TActivity.scss'

interface TActivityProps {
    content: React.ReactNode

}

const TActivity: React.FC<TActivityProps> = ({ content }) => (
    <>
        <div className='t-activity-header'>
            <AText tag="h2" text='Activity list' className="t-activity-header__title" />
        </div>
        <div className="t-activity-template">{content}</div>

    </>
)

export default TActivity