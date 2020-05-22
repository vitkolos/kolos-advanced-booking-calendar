/**
 * Block JS,
 * Script for all Blocks
 */
( function (blocks, editor, components, i18n, element ) {
	// Define common variables
	var el = wp.element.createElement;
	var registerBlockType = wp.blocks.registerBlockType;
	var InnerBlocks = wp.editor.InnerBlocks;
	var BlockControls = wp.editor.BlockControls;
	//var Dashicon = wp.components.Dashicon;
	var __ = wp.i18n.__;
	//var lang = wp.i18n;

	const blockIcon = wp.element.createElement( 'svg', 
		{ width: 24, height: 24 },
		wp.element.createElement( 'path', { 
			d: "M 19.5 0 L 16.5 0 L 16.5 3 L 19.5 3 Z M 22.5 0 L 21 0 L 21 4.5 L 15 4.5 L 15 0 L 9 0 L 9 4.5 L 3 4.5 L 3 0 L 1.5 0 C 0.671875 0 0 0.671875 0 1.5 L 0 22.5 C 0 23.3281 0.671875 24 1.5 24 L 22.5 24 C 23.3281 24 24 23.3281 24 22.5 L 24 1.5 C 24 0.671875 23.3281 0 22.5 0 Z M 21 21 L 3 21 L 3 7.5 L 21 7.5 Z M 7.5 0 L 4.5 0 L 4.5 3 L 7.5 3 Z M 13.5 10.5 L 10.5 10.5 L 10.5 13.5 L 13.5 13.5 Z M 18 10.5 L 15 10.5 L 15 13.5 L 18 13.5 Z M 9 15 L 6 15 L 6 18 L 9 18 Z M 9 10.5 L 6 10.5 L 6 13.5 L 9 13.5 Z M 13.5 15 L 10.5 15 L 10.5 18 L 13.5 18 Z M 18 15 L 15 15 L 15 18 L 18 18 Z M 18 15"
		} )
	);

	// Calendar Overview
	registerBlockType( 'abc-shortcodes/calendar-overview', {
		title: abcStrs.overview.title,
		description: '',
		icon: blockIcon,
		category: 'abc-shortcodes',
		edit: function() {
			return [
				el('div', { className: 'calendar-overview abc-shortcode' },
					el('h3', { className: 'abc-title' }, abcStrs.overview.title ),
					el('p', { className: 'abc-desc' }, abcStrs.overview.desc )
				)
			];
		},
		save: function(props) {
			return(
				el('div', { className: props.className }, '[abc-overview]' )
			);
		}
	} );

	// Single Calendar
	registerBlockType( 'abc-shortcodes/single-calendar', {
		title: abcStrs.single.title,
		description: '',
		icon: blockIcon,
		category: 'abc-shortcodes',
		attributes: {
			calendar: {
				type: 'string',
			},
			legend: {
				type: 'boolean',
				default: true
			}
		},
		edit: function( props ){
			return [
				el('div', { className: 'single-calendar abc-shortcode' },
					el('h3', { className: 'abc-title' }, abcStrs.single.title ),
					el('p', { className: 'abc-desc' }, abcStrs.single.desc ),

					el('div', { className: 'block-options' },
						el( components.SelectControl, {
							label: abcStrs.single.cal_lbl,
							options: jQuery.merge( [{"label": abcStrs.single.sel_cal,"value":""}], abc_block_calendars ),
							value: props.attributes.calendar,
							onChange: function( calendarID ) {
								props.setAttributes({ calendar: calendarID })
							}
						} ),
						el( components.CheckboxControl, {
							label: abcStrs.single.legend_lbl,
							checked: props.attributes.legend,
							onChange: function( legendVal ) {
								props.setAttributes({ legend: legendVal })
							}
						} ),
					)
				),
			];
		},
		save: function( props ){
			var calendar = props.attributes.calendar;
			var lagend = "0";
			if( props.attributes.legend ) {
				lagend = "1";
			}
			return(
				el('div', { className: props.className }, "[abc-single calendar='"+props.attributes.calendar+"' legend='"+lagend+"']" )
			);
		}
	} );

	// Booking Form
	registerBlockType( 'abc-shortcodes/booking-form', {
		title: abcStrs.bookingform.title,
		description: '',
		icon: blockIcon,
		category: 'abc-shortcodes',
		attributes: {
			calendar: {
				type: 'string',
			},
			hide_other: {
				type: 'boolean',
				default: false
			},
			hide_tooshort: {
				type: 'boolean',
				default: false
			}
		},
		edit: function( props ){
			return [
				el('div', { className: 'booking-form abc-shortcode' },
					el('h3', { className: 'abc-title' }, abcStrs.bookingform.title ),
					el('p', { className: 'abc-desc' }, abcStrs.bookingform.desc ),

					el('div', { className: 'block-options' },
						el( components.SelectControl, {
							label: abcStrs.bookingform.cal_lbl,
							multiple: true,
							value: props.attributes.calendar,
							options: abc_block_calendars,
							onChange: function( calendarIDs ) {
								props.setAttributes({ calendar: calendarIDs.join() })
							}
						} ),
						el( components.CheckboxControl, {
							className: 'mb-cbcf-0',
							checked: props.attributes.hide_other,
							label: abcStrs.bookingform.hide_other_lbl,
							onChange: function( hide_otherVal ) {
								props.setAttributes({ hide_other: hide_otherVal })
							}
						} ),
						el( components.CheckboxControl, {
							label: abcStrs.bookingform.hide_tooshort_lbl,
							checked: props.attributes.hide_tooshort,
							onChange: function( tooShortVal ) {
								props.setAttributes({ hide_tooshort: tooShortVal })
							}
						} ),
					)
				),
			];
		},
		save: function( props ){
			var calendar = props.attributes.calendar;
			var hide_other = hide_tooshort = "0";
			if( props.attributes.hide_other ) {
				hide_other = "1";
			}
			if( props.attributes.hide_tooshort ) {
				hide_tooshort = "1";
			}

			return(
				el('div', { className: props.className }, "[abc-bookingform calendars='"+calendar+"' hide_other='"+hide_other+"' hide_tooshort='"+hide_tooshort+"']" )
			);
		}
	} );

} ) (
	window.wp.blocks,
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element
);