import React, { useState } from "react";
import { Field, reduxForm, clearSubmitErrors } from "redux-form";
import { Form, Input, Radio, Select, Checkbox, Button, DatePicker, Row, Col } from "antd";
import './RegistrationForm.scss';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

//Позиционирование элементов формы. Применяется на все элемента FormItem
const formItemLayout = {
  labelCol: {
    xs: { span: '80px' },
    sm: { span: '80px' }
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 16
    }
  }
};

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      //Подчеркивает форму красным если статус error. Если success никак не реагирует.
      //Либо ставит галочку если включен hasFeedback
      validateStatus={hasError ? "error" : "success"}
      //Показывает галочку или крестик
      hasFeedback={hasFeedback && hasError}
      //Пишет под формой сообщение об ошибке
      help={hasError && meta.error}
    >
      {/* Children нужен если передан групповой компонент.
      И во внутрь Field вставляются дочерние компоненты типо Radio и тп.*/}
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};
//Обертка нужно чтобы использовать input, meta.error внутри компонентов AntDesign
const AInput = makeField(Input);
const ARadioGroup = makeField(RadioGroup);
const ASelect = makeField(Select);
const ACheckbox = makeField(Checkbox);
const ATextarea = makeField(TextArea);
const ARangePicker = makeField(RangePicker);



const RegistrationForm = props => {

  //setAuthWithVk проходит
  // console.log(props);

  //Глобальная ошибка. Например при валидации от сервера
  //Если в onSubmit передается функция которая возвращате промис, отображение ошибок не работает
  const { handleSubmit, pristine, reset, submitting, invalid } = props;
  return (
    <Row>
      <Col xs={24} sm={{ span: 12, offset: 6 }} md={{ span: 9, offset: 14 }} lg={{ span: 7, offset: 14 }}>
        <div className="loginForm">
          <h1>Добро пожаловать</h1>
          {/* onFinish не работает с обработчиком handleSubmit. Скорее всего это связано с тем
          что в hadnleSubmit используется e.preventDefault, а событие onFinish не передает event
          можно навестить handleSubmit на <Button onClick />, тогда все работает */}
          <Form>
            <Field label="Login" name="login" component={AInput} placeholder="Enter login" hasFeedback validate={[notEmpty]} />

            <Field label="Password" name="password" component={AInput} placeholder="Enter password" validate={[notEmpty]} />

            <Field label="Name" name="name" component={AInput} placeholder="Enter your name" validate={[notEmpty]} />

            {/* Див для рендера виджета Recaptcha */}
            <div id="html_element"></div>

            <FormItem>
              <div className="message">
                {props.error}
              </div>
              <Button onClick={handleSubmit} type="primary" loading={submitting} disabled={pristine || invalid} htmlType="submit" style={{ marginRight: "10px" }}>
                Registration
              </Button>
            </FormItem>
          </Form>
        </div>
      </Col>
    </Row>

  );
};

// Валидаторы
const notEmpty = (value) => {
  if (!value) {
    return 'Поле не может быть пустым';
  }
  return undefined;
}

const length8 = (value) => {
  if (value !== undefined && value.length <= 8) {
    return 'В поле должно быть больше 8-ми символов';
  }
  return undefined;
}

export default reduxForm({
  form: "registration", // Уникальное наименование формы
  onChange(values, dispatch) {
    dispatch(clearSubmitErrors('registration')); //Сбрасываем серверные ошибки
  }
})(RegistrationForm);
