<?php
defined( 'BASEPATH' )OR exit( 'No direct script access allowed' );
class Customers extends CIUIS_Controller {

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
		$data[ 'title' ] = lang( 'customers' );
		$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
		$this->load->view( 'inc/header', $data );
		$this->load->view( 'customers/index', $data );
		$this->load->view( 'inc/footer', $data );
	}

	function create() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			if ( $this->input->post( 'type' ) == 'true' ) {
				$type = 1;
			} else {
				$type = 0;
			}
			$params = array(
				'created' => date( 'Y-m-d H:i:s' ),
				'type' => $type,
				'company' => $this->input->post( 'company' ),
				'namesurname' => $this->input->post( 'namesurname' ),
				'ssn' => $this->input->post( 'ssn' ),
				'executive' => $this->input->post( 'executive' ),
				'address' => $this->input->post( 'address' ),
				'phone' => $this->input->post( 'phone' ),
				'email' => $this->input->post( 'email' ),
				'fax' => $this->input->post( 'fax' ),
				'web' => $this->input->post( 'web' ),
				'taxoffice' => $this->input->post( 'taxoffice' ),
				'taxnumber' => $this->input->post( 'taxnumber' ),
				'country_id' => $this->input->post( 'country_id' ),
				'state' => $this->input->post( 'state' ),
				'city' => $this->input->post( 'city' ),
				'town' => $this->input->post( 'town' ),
				'zipcode' => $this->input->post( 'zipcode' ),
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
				'staff_id' => $this->session->userdata( 'usr_id' ),
				'status_id' => $this->input->post( 'status' ),
			);
			$customers_id = $this->Customers_Model->add_customers( $params );
			// Custom Field Post
			if ( $this->input->post( 'custom_fields' ) ) {
				$custom_fields = array(
					'custom_fields' => $this->input->post( 'custom_fields' )
				);
				$this->Fields_Model->custom_field_data_add_or_update_by_type( $custom_fields, 'customer', $customers_id );
			}
			// Custom Field Post
			echo $customers_id;
		}
	}

	function customer( $id ) {
		$data[ 'title' ] = lang( 'customer' );
		$customers = $this->Customers_Model->get_customers( $id );
		$data[ 'ycr' ] = $this->Report_Model->ycr();
		if ( isset( $customers[ 'id' ] ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				$params = array(
					'company' => $this->input->post( 'company' ),
					'namesurname' => $this->input->post( 'namesurname' ),
					'ssn' => $this->input->post( 'ssn' ),
					'executive' => $this->input->post( 'executive' ),
					'address' => $this->input->post( 'address' ),
					'phone' => $this->input->post( 'phone' ),
					'email' => $this->input->post( 'email' ),
					'fax' => $this->input->post( 'fax' ),
					'web' => $this->input->post( 'web' ),
					'taxoffice' => $this->input->post( 'taxoffice' ),
					'taxnumber' => $this->input->post( 'taxnumber' ),
					'country_id' => $this->input->post( 'country_id' ),
					'state' => $this->input->post( 'state' ),
					'city' => $this->input->post( 'city' ),
					'town' => $this->input->post( 'town' ),
					'zipcode' => $this->input->post( 'zipcode' ),
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
					'staff_id' => $this->session->userdata( 'usr_id' ),
					'risk' => $this->input->post( 'risk' ),
					'status_id' => $this->input->post( 'status' ),
				);
				$this->Customers_Model->update_customers( $id, $params );
				$custom_fields = array(
					'custom_fields' => $this->input->post( 'custom_fields' )
				);
				$this->Fields_Model->custom_field_data_add_or_update_by_type( $custom_fields, 'customer', $id );
				echo lang( 'customerupdated' );
			} else {
				$data[ 'customers' ] = $this->Customers_Model->get_customers( $id );
				$this->load->view( 'customers/customer', $data );
			}
		} else
			show_error( 'Eror' );
	}

	function addreminder() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$params = array(
				'description' => $this->input->post( 'description' ),
				'relation' => $this->input->post( 'relation' ),
				'relation_type' => 'customer',
				'staff_id' => $this->input->post( 'staff' ),
				'addedfrom' => $this->session->userdata( 'usr_id' ),
				'date' => $this->input->post( 'date' ),
			);
			$notes = $this->Trivia_Model->add_reminder( $params );
			$this->session->set_flashdata( 'ntf1', '' . lang( 'reminderadded' ) . '' );
			redirect( 'customers/customer/' . $this->input->post( 'relation' ) . '' );
		} else {
			redirect( 'leads/index' );
		}
	}

	function remove( $id ) {
		$customers = $this->Customers_Model->get_customers( $id );
		if ( isset( $customers[ 'id' ] ) ) {
			$this->Customers_Model->delete_customers( $id );
			redirect( 'customers/index' );
		} else
			show_error( 'Customer not deleted' );
	}

	function customers_json() {
		$customers = $this->Customers_Model->get_all_customers();
		header( 'Content-Type: application/json' );
		echo json_encode( $customers );
	}

	function customers_arama_json() {
		$veriler = $this->Customers_Model->search_json_customer();
		echo json_encode( $veriler );

	}

	function create_contact() {
		if ( $this->Contacts_Model->isDuplicate( $this->input->post( 'email' ) ) ) {
			$this->session->set_flashdata( 'ntf4', 'Contact email already exists' );
			redirect( 'customers/customer/' . $this->input->post( 'customer' ) . '' );
		} else {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				switch ( $this->input->post( 'isPrimary' ) ) {
					case 'true':
						$primary = 1;
						$passNew = password_hash( $this->input->post( 'password' ), PASSWORD_BCRYPT );
						break;
					case 'false':
						$primary = 0;
						$passNew = null;
						break;
				}
				switch ( $this->input->post( 'isAdmin' ) ) {
					case true:
						$isAdmin = 1;
						break;
					case false:
						$isAdmin = 0;
						break;
				}
				$params = array(
					'name' => $this->input->post( 'name' ),
					'surname' => $this->input->post( 'surname' ),
					'phone' => $this->input->post( 'phone' ),
					'extension' => $this->input->post( 'extension' ),
					'mobile' => $this->input->post( 'mobile' ),
					'email' => $this->input->post( 'email' ),
					'address' => $this->input->post( 'address' ),
					'skype' => $this->input->post( 'skype' ),
					'linkedin' => $this->input->post( 'linkedin' ),
					'customer_id' => $this->input->post( 'customer' ),
					'position' => $this->input->post( 'position' ),
					'primary' => $primary,
					'admin' => $isAdmin,
					'password' => $passNew,
				);
				$contacts_id = $this->Contacts_Model->create( $params );
				// SEND EMAIL SETTINGS
				$setconfig = $this->Settings_Model->get_settings_ciuis();
				$subject = lang( 'your_login_informations' );
				$to = $this->input->post( 'email' );
				$data = array(
					'name' => $this->session->userdata( 'staffname' ),
					'password' => $this->input->post( 'password' ),
					'email' => $this->input->post( 'email' ),
					'loginlink' => '' . base_url( 'area/login' ) . ''
				);
				$body = $this->load->view( 'email/accountinfo.php', $data, TRUE );
				$result = send_email( $subject, $to, $data, $body );
				if ( $result ) {
					$message = sprintf( lang( 'addedcontacts' ), $this->input->post( 'name' ) );
					echo $message;
				} else {
					$message = sprintf( lang( 'addedcontactsbut' ), $this->input->post( 'name' ) );
					echo $message;
				}

			}
		}
	}

	function update_contact( $id ) {
		$contacts = $this->Contacts_Model->get_contacts( $id );
		if ( isset( $contacts[ 'id' ] ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				$params = array(
					'name' => $this->input->post( 'name' ),
					'surname' => $this->input->post( 'surname' ),
					'phone' => $this->input->post( 'phone' ),
					'extension' => $this->input->post( 'extension' ),
					'mobile' => $this->input->post( 'mobile' ),
					'email' => $this->input->post( 'email' ),
					'address' => $this->input->post( 'address' ),
					'skype' => $this->input->post( 'skype' ),
					'linkedin' => $this->input->post( 'linkedin' ),
					'position' => $this->input->post( 'position' ),
				);

				$this->Contacts_Model->update( $id, $params );
				return $this->session->set_flashdata( 'ntf1', ' (' . $this->input->post( 'name' ) . ') ' . lang( 'contactupdated' ) . '' );
			} else {
				$data[ 'contacts' ] = $this->Contacts_Model->get_contacts( $id );
			}
		} else
			show_error( 'The contacts you are trying to edit does not exist.' );
	}

	function update_contact_privilege( $id, $value, $privilege_id ) {
		if ( $value != 'false' ) {
			$params = array(
				'relation' => ( int )$id,
				'relation_type' => 'contact',
				'permission_id' => ( int )$privilege_id
			);
			$this->db->insert( 'privileges', $params );
			return $this->db->insert_id();
		} else {
			$response = $this->db->delete( 'privileges', array( 'relation' => $id, 'relation_type' => 'contact', 'permission_id' => $privilege_id ) );
		}

	}

	function change_password_contact( $id ) {
		$contact = $this->Contacts_Model->get_contacts( $id );
		if ( isset( $contact[ 'id' ] ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				$params = array(
					'password' => password_hash( $this->input->post( 'password' ), PASSWORD_BCRYPT ),
				);
				$customer = $contact[ 'customer_id' ];
				$staffname = $this->session->staffname;
				$contactname = $contact[ 'name' ];
				$contactsurname = $contact[ 'surname' ];
				$loggedinuserid = $this->session->usr_id;
				$this->db->insert( 'logs', array(
					'date' => date( 'Y-m-d H:i:s' ),
					'detail' => ( '' . $message = sprintf( lang( 'changedpassword' ), $staffname, $contactname, $contactsurname ) . '' ),
					'staff_id' => $loggedinuserid,
					'customer_id' => $customer,
				) );
				$this->Contacts_Model->update( $id, $params );
				// SEND EMAIL SETTINGS
				$setconfig = $this->Settings_Model->get_settings_ciuis();
				$subject = lang( 'your_password_changed' );
				$to = $contact[ 'email' ];
				$data = array(
					'name' => $this->session->userdata( 'staffname' ),
					'password' => $this->input->post( 'password' ),
					'email' => $contact[ 'email' ],
					'loginlink' => '' . base_url( 'customer/login' ) . ''
				);
				$body = $this->load->view( 'email/passwordchanged.php', $data, TRUE );
				$result = send_email( $subject, $to, $data, $body );
				if ( $result ) {
					echo ' ' . $contact[ 'name' ] . ' ' . lang( 'passwordchanged' ) . '';

				} else {
					echo ' ' . $contact[ 'name' ] . ' ' . lang( 'passwordchanged' ) . '';
				}
			}
		}
	}

	function remove_contact( $id ) {
		$contacts = $this->Contacts_Model->get_contacts( $id );
		if ( isset( $contacts[ 'id' ] ) ) {
			$this->Contacts_Model->delete( $id );
			echo lang( 'contactdeleted' );
		} else
			show_error( 'The contacts you are trying to delete does not exist.' );
	}
}