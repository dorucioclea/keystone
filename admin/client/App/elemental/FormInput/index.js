import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import styles from './styles';
import concatClassnames from '../../../utils/concatClassnames';
import InputNoedit from './noedit';

const classes = StyleSheet.create(styles);

// NOTE must NOT be functional component to allow `refs`

class FormInput extends Component {
	render () {
		const {
			aphroditeStyles,
			className,
			disabled,
			id,
			multiline,
			noedit,
			...props,
		} = this.props;

		// NOTE return a different component for `noedit`
		if (noedit) return <InputNoedit {...this.props} />;

		const { formFieldId, formLayout } = this.context;

		props.id = id || formFieldId;
		props.className = css(
			classes.FormInput,
			disabled ? classes['FormInput--disabled'] : null,
			formLayout ? classes['FormInput--form-layout-' + formLayout] : null,
			...concatClassnames(aphroditeStyles)
		);
		if (className) {
			props.className += (' ' + className);
		}

		const setRef = (n) => (this.target = n);
		const Tag = multiline ? 'textarea' : 'input';

		return (
			<Tag
				ref={setRef}
				disabled={props.disabled}
				{...props}
			/>
		);
	}
};

const stylesShape = {
	_definition: PropTypes.object,
	_name: PropTypes.string,
};

FormInput.propTypes = {
	aphroditeStyles: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.shape(stylesShape)),
		PropTypes.shape(stylesShape),
	]),
	multiline: PropTypes.bool,
	type: PropTypes.string,
};
FormInput.defaultProps = {
	type: 'text',
};
FormInput.contextTypes = {
	formLayout: PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	formFieldId: PropTypes.string,
};

module.exports = FormInput;
