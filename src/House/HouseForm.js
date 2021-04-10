
import Input 						from '../shared/FormElements/Input'
import Button 					from '../shared/FormElements/Button'
import {
  Form,
  Formik
}											 	from 'formik'
import styles 					from './Houses.module.css'
import React 						from 'react'

const HouseForm = (props) => {
  const { createHouseHandler } = props

  return (
    <Formik
      initialValues={{
        houseName: '',
        password: '',
      }}
      onSubmit={async (values) => {
        createHouseHandler(values.houseName, values.password)
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Input
            id='houseName'
            name='houseName'
            type='input'
            title='NAME OF THE HOUSE'
          />
          <Input
            id='password'
            name='password'
            type='password'
            title='EMAIL-PASSWORD'
          />
          <Button type='submit' className={styles.button}>
							ADD!
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default HouseForm