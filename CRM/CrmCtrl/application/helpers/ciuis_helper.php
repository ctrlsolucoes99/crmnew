<?php
defined( 'BASEPATH' )or exit( 'No direct script access allowed' );

function send_email( $subject, $to, $data, $body ) {
	// SEND EMAIL SETTINGS
	$CI = & get_instance();
	$CI->load->library( 'email' );
	$CI->load->model( 'Settings_Model' );
	$setconfig = $CI->Settings_Model->get_settings_ciuis();
	switch ( $setconfig[ 'email_encryption' ] ) {
		case 0:
			$encryption = null;
			$smtp_crypto = 'security';
			break;
		case 1:
			$encryption = 'ssl://';
			$smtp_crypto = 'ssl';
			break;
		case 2:
			$encryption = 'tls://';
			$smtp_crypto = 'tls';
			break;
	}
	$config = array();
	$config[ 'protocol' ] = 'smtp';
	$config[ 'smtp_host' ] = '' . $encryption . '' . $setconfig[ 'smtphost' ] . '';
	$config[ 'smtp_user' ] = $setconfig[ 'smtpusername' ];
	$config[ 'smtp_pass' ] = $setconfig[ 'smtppassoword' ];
	$config[ 'smtp_port' ] = $setconfig[ 'smtpport' ];
	$config[ 'smtp_crypto' ] = $smtp_crypto;
	$config[ 'smtp_timeout' ] = '4';
	$config[ 'wordwrap' ] = TRUE;
	$sender = $setconfig[ 'sendermail' ];
	$CI->email->initialize( $config );
	$CI->email->set_newline( "\r\n" );
	$CI->email->set_mailtype( "html" );
	$CI->email->from( $sender ); // change it to yours
	$CI->email->to( $to ); // change it to yours
	$CI->email->subject( $subject );
	$CI->email->message( $body );
	if ( $CI->email->send() ) {
		return true;

	} else {
		return false;
	}
}

function customer_meeting_check( $staff_id, $customer_id, $date ) {
	$ci = & get_instance();
	$row = $ci->db->get_where( 'meetings', array( 'customer_id' => $customer_id, 'date' => $date, 'staff_id' => $staff_id, ) )->row_array();
	return $row[ 'date' ];
}

function check_meeting( $staff_id, $date ) {
	$ci = & get_instance();
	$row = $ci->db->get_where( 'meetings', array( 'date' => $date, 'staff_id' => $staff_id, ) )->row_array();
	if ( isset( $row[ 'date' ] ) ) {
		return true;
	} else {
		return false;
	}
}

function weekdays() {
	return array(
		'' . lang( 'monday' ) . '',
		'' . lang( 'tuesday' ) . '',
		'' . lang( 'wednesday' ) . '',
		'' . lang( 'thursday' ) . '',
		'' . lang( 'friday' ) . '',
		'' . lang( 'saturday' ) . '',
		'' . lang( 'sunday' ) . '',
	);
}

function months() {
	return array(
		'' . lang( 'january' ) . '',
		'' . lang( 'february' ) . '',
		'' . lang( 'march' ) . '',
		'' . lang( 'april' ) . '',
		'' . lang( 'may' ) . '',
		'' . lang( 'june' ) . '',
		'' . lang( 'july' ) . '',
		'' . lang( 'august' ) . '',
		'' . lang( 'september' ) . '',
		'' . lang( 'october' ) . '',
		'' . lang( 'november' ) . '',
		'' . lang( 'december' ) . '',
	);
}

function weekdays_git() {
	return array(
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday'
	);
}

function ciuis_colors() {
	$colors = array(
		'#28B8DA',
		'#03a9f4',
		'#c53da9',
		'#757575',
		'#8e24aa',
		'#d81b60',
		'#0288d1',
		'#7cb342',
		'#fb8c00',
		'#84C529',
		'#fb3b3b'
	);

	return $colors;
}

function email_config() {
	$ci = & get_instance();
	$class = $ci->db->query( "SELECT * FROM settings" );
	$class = $class->result_array();
	return $class;
}

function ciuis_Hash() {
	return substr( str_shuffle( str_repeat( md5(), 10 ) ), 0, 6 );
}

function ciuis_set_color( $hex, $steps ) {
	$steps = max( -255, min( 255, $steps ) );
	$hex = str_replace( '#', '', $hex );
	if ( strlen( $hex ) == 3 ) {
		$hex = str_repeat( substr( $hex, 0, 1 ), 2 ) . str_repeat( substr( $hex, 1, 1 ), 2 ) . str_repeat( substr( $hex, 2, 1 ), 2 );
	}
	$color_parts = str_split( $hex, 2 );
	$return = '#';
	foreach ( $color_parts as $color ) {
		$color = hexdec( $color );
		$color = max( 0, min( 255, $color + $steps ) );
		$return .= str_pad( dechex( $color ), 2, '0', STR_PAD_LEFT );
	}
	return $return;
}

function _date( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%d.%m.%y", strtotime( $date ) );
}

function _adate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return date( "j F Y, g:i a", strtotime( $date ) );
}

function _dDay( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%d", strtotime( $date ) );
}

function _pdate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%Y-%m-%d", strtotime( $date ) );
}

function _phdate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%Y-%m-%d H:i", strtotime( $date ) );
}

// DATE TYPE
// 3000.12.01
function _rdate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%Y.%m.%m", strtotime( $date ) );
}
// 01.12.3000
function _udate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%d.%m.%Y", strtotime( $date ) );
}
// 3000-12-01
function _mdate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%y-%m-%d", strtotime( $date ) );
}
// 01-12-3000
function _cdate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%d-%m-%y", strtotime( $date ) );
}

function _cxdate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%d-%m-%Y", strtotime( $date ) );
}
// 3000/12/01
function _zdate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%y/%m/%d", strtotime( $date ) );
}
// 01/12/3000
function _kdate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%d/%m/%y", strtotime( $date ) );
}

function _ktdate( $date ) {
	if ( $date == '' || is_null( $date ) || $date == '0000-00-00' ) {
		return '';
	}
	return strftime( "%d/%m/%y", strtotime( $date ) );
}

function convertToHoursMins( $time, $format = '%02d:%02d' ) {
	if ( $time < 1 ) {
		return;
	}
	$hours = floor( $time / 60 );
	$minutes = ( $time % 60 );
	return sprintf( $format, $hours, $minutes );
}

function tes_ciuis( $datetime, $full = false ) {
	$today = time();
	$createdday = strtotime( $datetime );
	$datediff = abs( $today - $createdday );
	$difftext = "";
	$years = floor( $datediff / ( 365 * 60 * 60 * 24 ) );
	$months = floor( ( $datediff - $years * 365 * 60 * 60 * 24 ) / ( 30 * 60 * 60 * 24 ) );
	$days = floor( ( $datediff - $years * 365 * 60 * 60 * 24 - $months * 30 * 60 * 60 * 24 ) / ( 60 * 60 * 24 ) );
	$hours = floor( $datediff / 3600 );
	$minutes = floor( $datediff / 60 );
	$seconds = floor( $datediff );
	// Years
	if ( $difftext == "" ) {
		if ( $years > 1 )
			$difftext = $years . lang( 'yearsago' );
		elseif ( $years == 1 )
			$difftext = $years . lang( 'yearago' );
	}
	// Mounth
	if ( $difftext == "" ) {
		if ( $months > 1 )
			$difftext = $months . lang( 'monthsago' );
		elseif ( $months == 1 )
			$difftext = $months . lang( 'monthago' );
	}
	// Days
	if ( $difftext == "" ) {
		if ( $days > 1 )
			$difftext = $days . lang( 'daysago' );
		elseif ( $days == 1 )
			$difftext = $days . lang( 'dayago' );
	}
	// Hours
	if ( $difftext == "" ) {
		if ( $hours > 1 )
			$difftext = $hours . lang( 'hoursago' );
		elseif ( $hours == 1 )
			$difftext = $hours . lang( 'hourago' );
	}
	// Minutes
	if ( $difftext == "" ) {
		if ( $minutes > 1 )
			$difftext = $minutes . lang( 'minutesago' );
		elseif ( $minutes == 1 )
			$difftext = $minutes . lang( 'minuteago' );
	}
	// Seconds
	if ( $difftext == "" ) {
		if ( $seconds > 1 )
			$difftext = $seconds . lang( 'secondsago' );
		elseif ( $seconds == 1 )
			$difftext = $seconds . lang( 'secondago' );
	}
	return $difftext;
}