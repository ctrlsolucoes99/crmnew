<?php
defined( 'BASEPATH' )OR exit( 'No direct script access allowed' );
class Gateway extends CI_Controller {

	function __construct() {
		parent::__construct();
		$this->load->library( "Omni" );
		$this->lang->load( 'english', 'english' );
		$this->load->model( 'Invoices_Model' );
		$this->load->model( 'Customers_Model' );
		$this->load->model( 'Settings_Model' );
	}

	function success() {
		$this->load->view( 'gateway/success' );

	}

	function cancel() {
		$this->load->view( 'gateway/cancel' );
	}

	function paypal_ipn( $token ) {
		$settings = $this->Settings_Model->get_settings_ciuis();
		if ( isset( $token ) ) {
			$invoice = $this->Invoices_Model->get_invoices_by_token( $token );
			$response = $this->db->where( 'id', $invoice['id'] )->update( 'invoices', array( 'status_id' => 2, 'duedate' => 0 ) );
			$response = $this->db->where( 'invoice_id', $invoice['id'] )->update( 'sales', array(
				'status_id' => 2,
				'staff_id' => $invoice[ 'staff_id' ],
				'customer_id' => $invoice[ 'customer_id' ],
				'total' => $invoice[ 'total' ],
			) );
			$this->db->insert( 'payments', array(
				'transactiontype' => 0,
				'invoice_id' => $invoice[ 'id' ],
				'staff_id' => $invoice[ 'staff_id' ],
				'amount' => $invoice[ 'total' ],
				'customer_id' => $invoice[ 'customer_id' ],
				'account_id' => $settings[ 'authorize_record_account' ],
				'not' => '' . $message = sprintf( lang( 'paymentfor' ), $invoice['id'] ) . '',
				'date' => date( 'Y-m-d H:i:s' ),
			) );
			redirect( 'gateway/success' );
		}
	}

	function paypal( $token ) {
		//Set variables for paypal form
		$invoice = $this->Invoices_Model->get_invoices_by_token( $token );
		$returnURL = base_url( 'gateway/paypal_ipn/' . $invoice[ 'token' ] . '' );
		$cancelURL = base_url( 'gateway/cancel' );
		$notifyURL = base_url( 'pay/ipn' ); //ipn url
		$userID = 1; //current user id
		$invoiceno = 'INV-' . str_pad( $invoice[ 'id' ], 6, '0', STR_PAD_LEFT ) . '';
		$logo = base_url() . 'assets/img/logo.png';
		$this->omni->add_field( 'return', $returnURL );
		$this->omni->add_field( 'cancel_return', $cancelURL );
		$this->omni->add_field( 'notify_url', $notifyURL );
		$this->omni->add_field( 'item_name', $invoiceno );
		$this->omni->add_field( 'custom', $userID );
		$this->omni->add_field( 'item_number', str_pad( $invoice[ 'id' ], 6, '0', STR_PAD_LEFT ) );
		$this->omni->add_field( 'amount', $invoice[ 'total' ] );
		$this->omni->image( $logo );
		$this->omni->paypal_auto_form();
	}

	public

	function authorize( $token ) {
		$data[ 'invoice' ] = $this->Invoices_Model->get_invoices_by_token( $token );
		$invoice = $this->Invoices_Model->get_invoices_by_token( $token );
		$data[ 'customer' ] = $this->Customers_Model->get_customers( $invoice[ 'customer_id' ] );
		$this->load->view( 'gateway/authorize/authorize', $data );
	}

	public

	function pushPayment() {
		$settings = $this->Settings_Model->get_settings_ciuis();
		$dataCustomers = array( "fname" => $this->input->post( 'fname' ),
			"lname" => $this->input->post( 'lname' ),
			"address" => $this->input->post( 'address' ),
			"city" => $this->input->post( 'city' ),
			"state" => $this->input->post( 'state' ),
			"country" => $this->input->post( 'country' ),
			"zip" => $this->input->post( 'zip' ),
			"phone" => $this->input->post( 'phone' ),
			"email" => $this->input->post( 'email' ),
			"cnumber" => $this->input->post( 'cnumber' ),
			"cexpdate" => $this->input->post( 'cexpdate' ),
			"ccode" => $this->input->post( 'ccode' ),
			"cdesc" => $this->input->post( 'cdesc' ),
			"amount" => $this->input->post( 'camount' ),
			"inv_id" => $this->input->post( 'inv_id' ) );
		$result = $this->omni->chargerCreditCard( $dataCustomers );
		if ( $result ) {
			$data[ 'authorize_result' ] = $result;
			$invoice = $this->Invoices_Model->get_invoices( $this->input->post( 'inv_id' ) );
			$response = $this->db->where( 'id', $this->input->post( 'inv_id' ) )->update( 'invoices', array( 'status_id' => 2, 'duedate' => 0 ) );
			$response = $this->db->where( 'invoice_id', $this->input->post( 'inv_id' ) )->update( 'sales', array(
				'status_id' => 2,
				'staff_id' => $invoice[ 'staff_id' ],
				'customer_id' => $invoice[ 'customer_id' ],
				'total' => $this->input->post( 'camount' ),
			) );
			$this->db->insert( 'payments', array(
				'transactiontype' => 0,
				'invoice_id' => $invoice[ 'id' ],
				'staff_id' => $invoice[ 'staff_id' ],
				'amount' => $this->input->post( 'camount' ),
				'customer_id' => $invoice[ 'customer_id' ],
				'account_id' => $settings[ 'authorize_record_account' ],
				'not' => '' . $message = sprintf( lang( 'paymentfor' ), $invoice['id'] ) . '',
				'date' => date( 'Y-m-d H:i:s' ),
			) );
			redirect( 'gateway/success' );
		} else {
			redirect( 'gateway/cancel' );
		}


	}

}