<?php
defined( 'BASEPATH' )OR exit( 'No direct script access allowed' );

$ci = & get_instance();
$set = $ci->db->select( '*' )->get( 'settings' )->row_array();
switch ( $set[ 'paypalsandbox' ] ) {
	case '1':
		$config[ 'sandbox' ] = 'FALSE';
		break;
	case '1':
		$config[ 'sandbox' ] = 'TRUE';
		break;
}
$config[ 'business' ] = $set[ 'paypalemail' ];
$config[ 'paypal_lib_ipn_log_file' ] = BASEPATH . 'logs/paypal_ipn.log';
$config[ 'paypal_lib_ipn_log' ] = TRUE;
$config[ 'paypal_lib_button_path' ] = 'buttons';
$config[ 'paypal_lib_currency_code' ] = $set[ 'paypalcurrency' ];
$config[ 'authorize_login_id' ] = $set[ 'authorize_login_id' ];
$config[ 'authorize_transaction_key' ] = $set[ 'authorize_transaction_key' ];