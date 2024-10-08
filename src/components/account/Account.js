import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { AdressContext, DriverContext, SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import AccountItem from './AccountItem'
import RatingView from '../rating/RatingView'
import { FieldName } from '../ui/page/FieldName'
import Modal from '../ui/modal/Modal'
import SubscriptionForm from '../subscription/SubscriptionForm'
import SubscriptionStatusComponent from '../subscription/SubscriptionStatusComponent'
import AccountActivationStatus from './AccountActivationStatus'
import './Account.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import AccountInfoStatus from './AccountInfoStatus'
import PaymentComponent from '../payment/PaymentComponent'
import ShareComponent from '../share/ShareComponent'
import SupervisorInfoComponent from './SupervisorInfoComponent'
import AvatarComponent from './AvatarComponent'


const Account = observer(() => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const [modalActive, setModalActive] = useState(false)
    const [modalActive2, setModalActive2] = useState(false)
    const [passwordEditable, setPasswordEditable] = useState(false)
    const [loginEditable, setLoginEditable] = useState(false)
    const [cityEditable, setCityEditable] = useState(false)
    const [adressEditable, setAdressEditable] = useState(false)
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)
    const { Adress } = useContext(AdressContext)
    const { Driver } = useContext(DriverContext)

    const [yoomoneyToken, setYoomoneyToken] = useState('empty_token')
    const [paymentId, setPaymentId] = useState('')

    let shareName = !UserInfo.userInfo.legal ? UserInfo.userInfo.email : UserInfo.userInfo.legal === 'person' ? UserInfo.userInfo.name_surname_fathersname : UserInfo.userInfo.company_name


    const containerClassName = Setting.app_theme === 'light' ? 'account_container' : 'account_container account_container_dark'


    return (<>

        <HorizontalContainer
            style={{ marginTop: '10px', alignItems: 'flex-start' }}>

            {user.user.role !== 'driver' &&
                <Modal modalActive={modalActive} setModalActive={setModalActive}>
                    <SubscriptionForm setModalActive={setModalActive} setModalActive2={setModalActive2} setYoomoneyToken={setYoomoneyToken} paymentId={paymentId} setPaymentId={setPaymentId} />
                </Modal>
            }
            {user.user.role !== 'driver' &&
                <PaymentComponent modalActive2={modalActive2} setModalActive2={setModalActive2} yoomoneyToken={yoomoneyToken} setYoomoneyToken={setYoomoneyToken} paymentId={paymentId} setPaymentId={setPaymentId} />
            }

            <VerticalContainer>
            <AvatarComponent/>
                <AccountActivationStatus containerClassName={containerClassName} />
                <div
                    className={containerClassName}>
                    <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'auth_email')} fieldValue={user.user.email} editable={true} attachedField={'authEmail'} loginEditable={loginEditable} setLoginEditable={setLoginEditable} passwordEditable={passwordEditable} setPasswordEditable={setPasswordEditable} />
                    <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'password')} fieldValue={'****************'} editable={true} attachedField={'password'} loginEditable={loginEditable} setLoginEditable={setLoginEditable} passwordEditable={passwordEditable} setPasswordEditable={setPasswordEditable} />
                </div>
                <div
                    className={containerClassName}>
                    <FieldName>{SetNativeTranslate(Translate.language, {}, 'your_rating')}</FieldName>
                    <RatingView user={user} onePartnerInfo={UserInfo.userInfo} parent='account' />
                </div>
            </VerticalContainer>
            <VerticalContainer>
                <div
                    className={containerClassName}>
                    <AccountItem fieldName='id' fieldValue={UserInfo.userInfo.id} editable={false} />

                    {UserInfo.userInfo.name_surname_fathersname && user.user.role !== 'driver' ?
                        <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'name_surname_fathersname_validation')} fieldValue={UserInfo.userInfo.name_surname_fathersname} editable={true} attachedField={'name_surname_fathersname'} /> : <></>}
                    {user.user.role !== 'driver' && <>
                        <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'country_content')} fieldValue={SetNativeTranslate(Translate.language, {}, UserInfo.userInfo.country)} editable={false} attachedField={'country'} />
                        <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'city_content')} fieldValue={UserInfo.userInfo.city} editable={Driver.drivers.length >0 ? false : true} attachedField={'city'} cityEditable={cityEditable} setCityEditable={setCityEditable} adressEditable={adressEditable} setAdressEditable={setAdressEditable} /></>}
                    {UserInfo.userInfo.phone ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'phone_content')} fieldValue={UserInfo.userInfo.phone} editable={true} attachedField={'phone'} /> : <></>}

                    <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'notification_email_content')} fieldValue={UserInfo.userInfo.email} editable={true} attachedField={'email'} />

                    {UserInfo.userInfo.company_adress ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'adress_content')} fieldValue={UserInfo.userInfo.company_adress} editable={true} attachedField={'company_adress'}
                        cityEditable={cityEditable} setCityEditable={setCityEditable} adressEditable={adressEditable} setAdressEditable={setAdressEditable}
                    /> : <></>}
                    {UserInfo.userInfo.type_of_customer ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'delivery_for')} fieldValue={SetNativeTranslate(Translate.language, {}, UserInfo.userInfo.type_of_customer)} editable={true} attachedField={'type_of_customer'} /> : <></>}
                </div>

                {user.user.role === 'driver' && <SupervisorInfoComponent containerClassName={containerClassName} />}

                {user.user.role !== 'driver' &&
                    <div
                        className={containerClassName}>

                        <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'can_add')} fieldValue={UserInfo.userInfo.uuid} editable={false} attachedField={''} />

                        <div className='account_share_container'>
                            <div className='account_share_text' t>{SetNativeTranslate(Translate.language, {
                                russian: [`Поделитесь ссылкой ${user.user.role === 'carrier' ? 'с заказчиком' : user.user.role === 'customer' ? 'c перевозчиком' : ''}`],
                                english: [`Share the link ${user.user.role === 'carrier' ? 'with customer' : user.user.role === 'customer' ? 'with carrier' : ''}`],
                                spanish: [`Comparte el enlace ${user.user.role === 'carrier' ? 'con el cliente' : user.user.role === 'customer' ? 'con transportista' : ''}`],
                                turkish: [`Bağlantıyı paylaş ${user.user.role === 'carrier' ? 'müşteri ile' : user.user.role === 'customer' ? 'taşıyıcı ile' : ''}`],
                                сhinese: [`分享链接 ${user.user.role === 'carrier' ? '与客户' : user.user.role === 'customer' ? '有载体' : ''}`],
                                hindi: [`लिंक साझा करें ${user.user.role === 'carrier' ? 'ग्राहक के साथ' : user.user.role === 'customer' ? 'वाहक के साथ' : ''}`],

                            })}</div>
                            <ShareComponent parent={'account_uuid'} shareName={shareName}
                            />
                        </div>

                    </div>}

            </VerticalContainer>


            <>
                {(user.user.role === 'driver' && UserInfo.userInfo.passport_number) || (UserInfo.userInfo.legal && user.user.role !== 'driver') ?
                    <VerticalContainer>
                        <div
                            className={containerClassName}>
                            {UserInfo.userInfo.legal === 'sole_trader' || UserInfo.userInfo.legal === 'entity' ? <>
                                {UserInfo.userInfo.legal ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'legal_content')} fieldValue={SetNativeTranslate(Translate.language, {}, UserInfo.userInfo.legal)} editable={true} attachedField={'legal'} /> : <></>}
                                {UserInfo.userInfo.company_name ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'company_name_content')} fieldValue={UserInfo.userInfo.company_name} editable={true} attachedField={'company_name'} /> : <></>}
                                {UserInfo.userInfo.website ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'website_content')} fieldValue={UserInfo.userInfo.website} editable={true} attachedField={'website'} /> : <></>}
                                {UserInfo.userInfo.company_inn ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'company_inn_content')} fieldValue={UserInfo.userInfo.company_inn} editable={true} attachedField={'company_inn'} /> : <></>}
                            </> : <></>}
                            {UserInfo.userInfo.legal === 'person' ? <>
                                {UserInfo.userInfo.legal ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'legal_content')} fieldValue={SetNativeTranslate(Translate.language, {}, UserInfo.userInfo.legal)} editable={true} attachedField={'legal'} /> : <></>}
                                {UserInfo.userInfo.passport_number ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'passport_number_content')} fieldValue={UserInfo.userInfo.passport_number} editable={true} attachedField={'passport_number'} /> : <></>}
                                {UserInfo.userInfo.passport_date_of_issue ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'passport_date_of_issue_content')} fieldValue={UserInfo.userInfo.passport_date_of_issue} editable={true} attachedField={'passport_date_of_issue'} /> : <></>}
                                {UserInfo.userInfo.passport_issued_by ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'passport_issued_by_content')} fieldValue={UserInfo.userInfo.passport_issued_by} editable={true} attachedField={'passport_issued_by'} /> : <></>}
                            </> : <></>}
                        </div>

                        {user.user.role !== 'driver' && Adress.country.value === 'russia' ?
                            <div
                                className={containerClassName}>
                                <FieldName>{SetNativeTranslate(Translate.language, {}, 'subscription_status')}</FieldName>
                                <SubscriptionStatusComponent setModalActive={setModalActive} />
                            </div> : <></>
                        }
                    </VerticalContainer>
                    :
                    <VerticalContainer>
                        <AccountInfoStatus containerClassName={containerClassName} />
                    </VerticalContainer>
                }
            </>


        </HorizontalContainer> 
    </>
    )
})

export default Account