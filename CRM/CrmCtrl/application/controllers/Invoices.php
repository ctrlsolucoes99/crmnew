<?php
defined( 'BASEPATH' )OR exit( 'No direct script access allowed' );
class Invoices extends CIUIS_Controller {

	function __construct() {
		parent::__construct();
		$path = $this->uri->segment( 1 );
		if ( !$this->Privileges_Model->has_privilege( $path ) ) {
			$this->session->set_flashdata( 'ntf3', '' . lang( 'you_dont_have_permission' ) );
			redirect( 'panel/' );
			die;
		}
	}

	function index() {
		$data[ 'title' ] = lang( 'invoices' );
		$data[ 'off' ] = $this->Report_Model->pff();
		$data[ 'ofv' ] = $this->Report_Model->ofv();
		$data[ 'oft' ] = $this->Report_Model->oft();
		$data[ 'vgf' ] = $this->Report_Model->vgf();
		$data[ 'tfa' ] = $this->Report_Model->tfa();
		$data[ 'pfs' ] = $this->Report_Model->pfs();
		$data[ 'otf' ] = $this->Report_Model->otf();
		$data[ 'tef' ] = $this->Report_Model->tef();
		$data[ 'vdf' ] = $this->Report_Model->vdf();
		$data[ 'fam' ] = $this->Report_Model->fam();
		$data[ 'ofy' ] = ( $data[ 'tfa' ] > 0 ? number_format( ( $data[ 'tef' ] * 100 ) / $data[ 'tfa' ] ) : 0 );
		$data[ 'ofx' ] = ( $data[ 'tfa' ] > 0 ? number_format( ( $data[ 'otf' ] * 100 ) / $data[ 'tfa' ] ) : 0 );
		$data[ 'vgy' ] = ( $data[ 'tfa' ] > 0 ? number_format( ( $data[ 'vdf' ] * 100 ) / $data[ 'tfa' ] ) : 0 );
		$data[ 'invoices' ] = $this->Invoices_Model->get_all_invoices();
		$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
		$this->load->view( 'invoices/index', $data );
	}

	function create() {
		$data[ 'title' ] = lang( 'newinvoice' );
		$products = $this->Products_Model->get_all_products();
		$settings = $this->Settings_Model->get_settings_ciuis();
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$status_value = $this->input->post( 'status' );
			if ( $status_value == 'true' ) {
				$datepayment = $this->input->post( 'datepayment' );
				$duenote = null;
				$duedate = null;
				$status = 2;
			} else {
				$duedate = $this->input->post( 'duedate' );
				$duenote = $this->input->post( 'duenote' );
				$datepayment = null;
				$status = 3;
			}
			$params = array(
				'token' => md5( uniqid() ),
				'no' => $this->input->post( 'no' ),
				'serie' => $this->input->post( 'serie' ),
				'customer_id' => $this->input->post( 'customer' ),
				'staff_id' => $this->session->usr_id,
				'status_id' => $status,
				'created' => $this->input->post( 'created' ),
				'duedate' => $duedate,
				'datepayment' => $datepayment,
				'duenote' => $duenote,
				'sub_total' => $this->input->post( 'sub_total' ),
				'total_discount' => $this->input->post( 'total_discount' ),
				'total_tax' => $this->input->post( 'total_tax' ),
				'total' => $this->input->post( 'total' ),
				'billing_street' => $this->input->post( 'billing_street' ),
				'billing_city' => $this->input->post( 'billing_city' ),
				'billing_state' => $this->input->post( 'billing_state' ),
				'billing_zip' => $this->input->post( 'billing_zip' ),
				'billing_country' => $this->input->post( 'billing_country' ),
				'shipping_street' => $this->input->post( 'shipping_street' ),
				'shipping_city' => $this->input->post( 'shipping_city' ),
				'shipping_state' => $this->input->post( 'shipping_state' ),
				'shipping_zip' => $this->input->post( 'shipping_zip' ),
				'shipping_country' => $this->input->post( 'shipping_country' ),
			);
			$invoices_id = $this->Invoices_Model->invoice_add( $params );
			// Custom Field Post
			if ( $this->input->post( 'custom_fields' ) ) {
				$custom_fields = array(
					'custom_fields' => $this->input->post( 'custom_fields' )
				);
				$this->Fields_Model->custom_field_data_add_or_update_by_type( $custom_fields, 'invoice', $invoices_id );
			}
			// Custom Field Post
			echo $invoices_id;
			// START Recurring Invoice
			if ( $this->input->post( 'recurring' ) == 'true' ) {
				$SHXparams = array(
					'relation_type' => 'invoice',
					'relation' => $invoices_id,
					'period' => $this->input->post( 'recurring_period' ),
					'end_date' => $this->input->post( 'end_recurring' ),
					'type' => $this->input->post( 'recurring_type' ),
				);
				$recurring_invoices_id = $this->Invoices_Model->recurring_add( $SHXparams );
			}
			// END Recurring Invoice
		} else {
			$data[ 'all_customers' ] = $this->Customers_Model->get_all_customers();
			$data[ 'all_accounts' ] = $this->Accounts_Model->get_all_accounts();
			$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
			$this->load->view( 'inc/header', $data );
			$this->load->view( 'invoices/create', $data );
			$this->load->view( 'inc/footer', $data );
		}
	}

	function update( $id ) {
		$invoices = $this->Invoices_Model->get_invoices( $id );
		$data[ 'title' ] = '' . lang( 'updateinvoicetitle' ) . ' ' . lang( 'invoiceprefix' ) . '-' . str_pad( $invoices[ 'id' ], 6, '0', STR_PAD_LEFT ) . '';
		$data[ 'invoices' ] = $this->Invoices_Model->get_invoice_detail( $id );
		if ( isset( $invoices[ 'id' ] ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				if ( $invoices[ 'status_id' ] == 2 ) {
					$datepayment = $this->input->post( 'datepayment' );
					$duenote = null;
					$duedate = null;
				} else {
					$duedate = $this->input->post( 'duedate' );
					$duenote = $this->input->post( 'duenote' );
					$datepayment = null;
				}
				$params = array(
					'no' => $this->input->post( 'no' ),
					'serie' => $this->input->post( 'serie' ),
					'customer_id' => $this->input->post( 'customer' ),
					'created' => $this->input->post( 'created' ),
					'duedate' => $duedate,
					'duenote' => $duenote,
					'sub_total' => $this->input->post( 'sub_total' ),
					'total_discount' => $this->input->post( 'total_discount' ),
					'total_tax' => $this->input->post( 'total_tax' ),
					'total' => $this->input->post( 'total' ),
				);
				$this->Invoices_Model->update_invoices( $id, $params );
				$custom_fields = array(
					'custom_fields' => $this->input->post( 'custom_fields' )
				);
				$this->Fields_Model->custom_field_data_add_or_update_by_type( $custom_fields, 'invoice', $id );
				echo $id;

				// START Recurring Invoice
				if ( $this->input->post( 'recurring_status' ) === true ) {
					$SHXparams = array(
						'period' => $this->input->post( 'recurring_period' ),
						'end_date' => $this->input->post( 'end_recurring' ),
						'type' => $this->input->post( 'recurring_type' ),
						'status' => 0,
					);
					$recurring_invoices_id = $this->Invoices_Model->recurring_update( $id, $SHXparams );
				} else {
					$SHXparams = array(
						'period' => $this->input->post( 'recurring_period' ),
						'end_date' => $this->input->post( 'end_recurring' ),
						'type' => $this->input->post( 'recurring_type' ),
						'status' => 1,
					);
					$recurring_invoices_id = $this->Invoices_Model->recurring_update( $id, $SHXparams );
				}
				if ( !is_numeric( $this->input->post( 'recurring_id' ) ) ) { // NEW Recurring From Update
					$SHXparams = array(
						'relation_type' => 'invoice',
						'relation' => $id,
						'period' => $this->input->post( 'recurring_period' ),
						'end_date' => $this->input->post( 'end_recurring' ),
						'type' => $this->input->post( 'recurring_type' ),
					);
					$recurring_invoices_id = $this->Invoices_Model->recurring_add( $SHXparams );
				}
				// END Recurring Invoice
			} else {
				$this->load->view( 'invoices/update', $data );
			}
		} else
			$this->session->set_flashdata( 'ntf3', '' . $id . lang( 'error' ) );
	}

	function invoice( $id ) {
		$invoices = $this->Invoices_Model->get_invoice_detail( $id );
		$data[ 'title' ] = '' . lang( 'invoiceprefix' ) . '-' . str_pad( $invoices[ 'id' ], 6, '0', STR_PAD_LEFT ) . ' ' . lang( 'detail' ) . '';
		$data[ 'invoices' ] = $this->Invoices_Model->get_invoice_detail( $id );
		$this->load->view( 'inc/header', $data );
		$this->load->view( 'invoices/invoice', $data );
		$this->load->view( 'inc/footer', $data );
	}

	function record_payment() {
		$amount = $this->input->post( 'amount' );
		$invoicetotal = $this->input->post( 'invoicetotal' );
		if ( $amount > $invoicetotal ) {
			echo lang( 'paymentamounthigh' );
		} else {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				$params = array(
					'invoice_id' => $this->input->post( 'invoice' ),
					'amount' => $amount,
					'account_id' => $this->input->post( 'account' ),
					'date' => $this->input->post( 'date' ),
					'not' => $this->input->post( 'not' ),
					'attachment' => $this->input->post( 'attachment' ),
					'customer_id' => $this->input->post( 'customer' ),
					'staff_id' => $this->input->post( 'staff' ),
				);
				$payments = $this->Payments_Model->addpayment( $params );
				echo lang( 'paymentaddedsuccessfully' );

			}
		}
	}

	function create_pdf( $id ) {
		$data[ 'invoice' ] = $this->Invoices_Model->get_invoice_detail( $id );
		$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
		$data[ 'items' ] = $this->db->select( '*' )->get_where( 'items', array( 'relation_type' => 'invoice', 'relation' => $id ) )->result_array();
		$this->load->view( 'invoices/pdf', $data );
		$file_name = '' . lang( 'invoiceprefix' ) . '-' . str_pad( $id, 6, '0', STR_PAD_LEFT ) . '.pdf';
		$html = $this->output->get_output();
		$this->load->library( 'dom' );
		$this->dompdf->loadHtml( $html );
		$this->dompdf->set_option( 'isRemoteEnabled', TRUE );
		$this->dompdf->setPaper( 'A4', 'portrait' );
		$this->dompdf->render();
		$output = $this->dompdf->output();
		file_put_contents( 'assets/files/generated_pdf_files/invoices/' . $file_name . '', $output );
		//$this->dompdf->stream( '' . $file_name . '', array( "Attachment" => 0 ) );
		if ( $output ) {
			redirect( base_url( 'invoices/pdf_generated/' . $file_name . '' ) );
		} else {
			redirect( base_url( 'invoices/pdf_fault/' ) );
		}
	}

	function print_( $id ) {
		$data[ 'invoice' ] = $this->Invoices_Model->get_invoice_detail( $id );
		$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
		$data[ 'items' ] = $this->db->select( '*' )->get_where( 'items', array( 'relation_type' => 'invoice', 'relation' => $id ) )->result_array();
		$this->load->view( 'invoices/pdf', $data );
		$file_name = '' . lang( 'invoiceprefix' ) . '-' . str_pad( $id, 6, '0', STR_PAD_LEFT ) . '.pdf';
		$html = $this->output->get_output();
		$this->load->library( 'dom' );
		$this->dompdf->loadHtml( $html );
		$this->dompdf->set_option( 'isRemoteEnabled', TRUE );
		$this->dompdf->setPaper( 'A4', 'portrait' );
		$this->dompdf->render();
		$output = $this->dompdf->output();
		file_put_contents( 'assets/files/generated_pdf_files/invoices/' . $file_name . '', $output );
		$this->dompdf->stream( '' . $file_name . '', array( "Attachment" => 0 ) );
	}

	function pdf_generated( $file ) {
		$result = array(
			'status' => true,
			'file_name' => $file,
		);
		echo json_encode( $result );
	}

	function pdf_fault() {
		$result = array(
			'status' => false,
		);
		echo json_encode( $result );
	}

	function dp( $id ) {
		$data[ 'invoice' ] = $this->Invoices_Model->get_invoice_detail( $id );
		$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
		$data[ 'items' ] = $this->db->select( '*' )->get_where( 'items', array( 'relation_type' => 'invoice', 'relation' => $id ) )->result_array();
		$this->load->view( 'invoices/pdf', $data );
	}

	function share( $id ) {
		$inv = $this->Invoices_Model->get_invoice_detail( $id );
		// SEND EMAIL SETTINGS
		switch ( $inv[ 'type' ] ) {
			case '0':
				$invcustomer = $inv[ 'customercompany' ];
				break;
			case '1':
				$invcustomer = $inv[ 'namesurname' ];
				break;
		}
		$subject = lang( 'yourinvoicedetails' );
		$to = $inv[ 'email' ];
		$data = array(
			'customer' => $invcustomer,
			'customermail' => $inv[ 'email' ],
			'invoicelink' => '' . base_url( 'share/invoice/' . $inv[ 'token' ] . '' ) . ''
		);
		$body = $this->load->view( 'email/invoices/sendinvoice.php', $data, TRUE );
		$result = send_email( $subject, $to, $data, $body );
		if ( $result ) {
			$response = $this->db->where( 'id', $id )->update( 'invoices', array( 'datesend' => date( 'Y-m-d H:i:s' ) ) );
			$this->session->set_flashdata( 'ntf1', '<b>' . $inv[ 'email' ], lang( 'sendmailcustomer' ) . '</b>' );
			redirect( 'invoices/invoice/' . $id . '' );

		} else {
			$this->session->set_flashdata( 'ntf4', '<b>' . lang( 'sendmailcustomereror' ) . '</b>' );
			redirect( 'invoices/invoice/' . $id . '' );
		}


	}

	function mark_as_draft( $id ) {
		$response = $this->db->where( 'id', $id )->update( 'invoices', array( 'status_id' => 1 ) );
		$response = $this->db->update( 'sales', array( 'invoice_id' => $id, 'status_id' => 1 ) );
		echo lang( 'markedasdraft' );
	}

	function mark_as_cancelled( $id ) {
		$response = $this->db->where( 'id', $id )->update( 'invoices', array( 'status_id' => 4 ) );
		$response = $this->db->delete( 'sales', array( 'invoice_id' => $id ) );
		$response = $this->db->delete( 'payments', array( 'invoice_id' => $id ) );
		echo lang( 'markedascancelled' );
	}

	function remove( $id ) {
		$invoices = $this->Invoices_Model->get_invoices( $id );
		if ( isset( $invoices[ 'id' ] ) ) {
			$this->session->set_flashdata( 'ntf4', lang( 'invoicedeleted' ) );
			$this->Invoices_Model->delete_invoices( $id );
			redirect( 'invoices/index' );
		} else
			show_error( 'The invoices you are trying to delete does not exist.' );
	}

	function remove_item( $id ) {
		$response = $this->db->delete( 'items', array( 'id' => $id ) );
	}

}