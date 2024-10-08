import React, { useContext } from 'react'
import { CardButton } from '../ui/button/CardButton'
import { Input } from '../ui/form/Input'
import { FieldName } from '../ui/page/FieldName'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'

import { TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const AddPartnerGroupComponent = ({ formData, setFormData, parent, createNewGroup, setModalActive,formReset }) => {

    const { Translate } = useContext(TranslateContext)

    return (
        <>
            {parent !== 'partnerList' && parent !== 'groupModal' ?
                <div className='group_list_container'>
                    <Input placeholder={SetNativeTranslate(Translate.language,{},'group_name')} value={formData.groupName.value}
                        onChange={(e) => formData.groupName.onChange(e)}
                        onBlur={e => formData.groupName.onBlur(e)}
                        type="text" name="groupName" id='groupName'
                        style={{ borderLeft: formData.groupName.notValid || formData.groupName.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '', height: '16px' }}
                    >
                    </Input>

                    <FieldName
                        style={{
                            fontWeight: 'normal',
                            color: 'rgb(254, 111, 103,0.8)',
                            width: '80%'
                        }}
                    >
                        {(formData.groupName.isEmpty && formData.groupName.isDirty) || (formData.groupName.minLengthError) || (formData.groupName.maxLengthError) ?
                            formData.groupName.errorMessage :
                            ''
                        }
                    </FieldName>
                    <HorizontalContainer>
                        <CardButton
                            onClick={createNewGroup}
                            disabled={formData.groupName.isEmpty || formData.groupName.notValid} 
                        >{SetNativeTranslate(Translate.language,{},'add')}</CardButton>
                        <CardButton
                            onClick={() => {
                                formReset()
                                setModalActive(false)
                            }}
                        >{SetNativeTranslate(Translate.language,{},'close')}</CardButton>
                    </HorizontalContainer>
                </div> : <></>}
        </>
    )
}

export default AddPartnerGroupComponent