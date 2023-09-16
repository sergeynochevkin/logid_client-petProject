import React, { useContext, useEffect } from 'react'
import { useInput } from '../../hooks/useInput'
import { Input } from '../ui/form/Input'
import { FieldName } from '../ui/page/FieldName'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'
import { TranslateContext } from '../..'
import { Textarea } from '../ui/form/Textarea'

const TransportFormAdText = ({ formData }) => {
    const { Translate } = useContext(TranslateContext)  

    return (
        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Textarea value={formData.ad_text.value} rows="6"
                placeholder={SetNativeTranslate(Translate.language, {
                    russian: ['Рекламный текст, не более 150 символов, пожалуйста не указывайте телефон, email, сайт. Транспорт с этими данными показан не будет. Мы отобразим контактные данные из вашего профиля'],
                    english: ['Advertising text, no more than 150 characters, please do not include phone, email, website. Vehicles with this data will not be displayed. We will display contact details from your profile'],
                    spanish: ['Texto publicitario, no más de 150 caracteres, por favor no incluya teléfono, correo electrónico, sitio web. Los vehículos con estos datos no se mostrarán. Mostraremos los datos de contacto de tu perfil'],
                    turkish: ['Reklam metni en fazla 150 karakter olmalıdır; lütfen telefon, e-posta, web sitesi eklemeyin. Bu verilere sahip araçlar gösterilmeyecektir. Profilinizdeki iletişim bilgilerini görüntüleyeceğiz'],
                })}
                onInput={(e) => {
                    formData.ad_text.onChange(e)                  
                }}
                onBlur={e => formData.ad_text.onBlur(e)}
                style={{ borderLeft: ((formData.ad_text.minLengthError && !formData.ad_text.isEmpty) || (formData.ad_text.maxLengthError && !formData.ad_text.isEmpty)) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                name="ad_text" id="ad_text"
            ></Textarea>

            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {(formData.ad_text.minLengthError && !formData.ad_text.isEmpty) || (formData.ad_text.maxLengthError && !formData.ad_text.isEmpty) ?
                    formData.ad_text.errorMessage :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default TransportFormAdText