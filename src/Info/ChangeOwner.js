import axios                  from 'axios'
import {
  Formik,
  Form
}								 	            from 'formik'
import {
  useSelector,
  useDispatch,
}          				            from 'react-redux'
import {
  useParams,
  useHistory
} 								            from 'react-router-dom'
import React 			            from 'react'

import { startRefreshToken } 	from '../Auth/thunks'
import { createError }        from '../Loading/thunks'
import { createMessage }      from '../Success/thunks'
import { changedPassword }    from '../Success/SuccessMessages'
import Button 		            from '../shared/FormElements/Button'
import Input 			            from '../shared/FormElements/Input'
import FormModal 	            from '../shared/UIElements/FormModal/FormModal'

const ChangeOwner = (props) => {
  const houseParam = useParams().houseId 
  const { token } = useSelector((state) => ({ ...state.auth }))
  const dispatch = useDispatch()
  const history = useHistory()


  const changeOwnerHandler = (email) => {
    const reqData = {
      email,
      houseId: houseParam,
    }
    axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/house/changeowner`,
      reqData,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).
      then((res) => {
        dispatch(createMessage(changedPassword))
        dispatch(startRefreshToken(res.data.token))
        history.push('/')
      }).catch(() => {
        dispatch(createError('Could not transfer ownership'))
      })
  }

  const form = (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={async (values) => {
        changeOwnerHandler(values.email)
      }}
    >
      {() => (
        <Form>
          <Input id='email' name='email' type='input' title='E-MAIL' />
          <Button type='button' cancel onClick={props.cancel}>
						CANCEL
          </Button>
          <Button type='submit'>SUBMIT</Button>
        </Form>
      )}
    </Formik>
  )
  return (
    <FormModal
      onCancel={props.cancel}
      header='CHANGE OWNER?'
      show={props.show}
      form={form}
    />
  )
}

export default ChangeOwner