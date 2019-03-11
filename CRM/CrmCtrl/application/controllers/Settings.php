<?php
if ( !defined( 'BASEPATH' ) )exit( 'No direct script access allowed' );
class Settings extends CIUIS_Controller {

	function index() {
		$data[ 'title' ] = lang( 'settings' );
		if ( $this->session->userdata( 'admin' ) ) {
			$this->load->view( 'inc/header', $data );
			$this->load->view( 'settings/index', $data );
			$this->load->view( 'inc/footer', $data );
		} else {
			redirect( 'panel' );
		}
	}

	function update( $settingname ) {
		if ( isset( $settingname ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				$config[ 'upload_path' ] = './uploads/ciuis_settings/';
				$config[ 'allowed_types' ] = 'gif|jpg|png|jpeg';
				switch ( $_POST[ 'pushState' ] ) {
					case 'true':
						$PushState = 0;
						break;
					case 'false':
						$PushState = 0;
						break;
				}
				switch ( $_POST[ 'voicenotification' ] ) {
					case 'true':
						$VoiceNotification = 1;
						break;
					case 'false':
						$VoiceNotification = 0;
						break;
				}
				switch ( $_POST[ 'paypalenable' ] ) {
					case 'true':
						$paypalenable = 1;
						break;
					case 'false':
						$paypalenable = 0;
						break;
				}
				switch ( $_POST[ 'paypalsandbox' ] ) {
					case 'true':
						$paypalsandbox = 1;
						break;
					case 'false':
						$paypalsandbox = 0;
						break;
				}
				switch ( $_POST[ 'authorize_enable' ] ) {
					case 'true':
						$authorize_enable = 1;
						break;
					case 'false':
						$authorize_enable = 0;
						break;
				}
				switch ( $_POST[ 'two_factor_authentication' ] ) {
					case 'true':
						$two_factor_authentication = 1;
						break;
					case 'false':
						$two_factor_authentication = 0;
						break;
				}
				$params = array(
					'crm_name' => $this->input->post( 'crm_name' ),
					'company' => $this->input->post( 'company' ),
					'email' => $this->input->post( 'email' ),
					'address' => $this->input->post( 'address' ),
					'city' => $this->input->post( 'city' ),
					'town' => $this->input->post( 'town' ),
					'state' => $this->input->post( 'state' ),
					'country_id' => $this->input->post( 'country_id' ),
					'zipcode' => $this->input->post( 'zipcode' ),
					'phone' => $this->input->post( 'phone' ),
					'fax' => $this->input->post( 'fax' ),
					'vatnumber' => $this->input->post( 'vatnumber' ),
					'taxoffice' => $this->input->post( 'taxoffice' ),
					'currencyid' => $this->input->post( 'currencyid' ),
					'termtitle' => $this->input->post( 'termtitle' ),
					'termdescription' => $this->input->post( 'termdescription' ),
					'dateformat' => $this->input->post( 'dateformat' ),
					'languageid' => $this->input->post( 'languageid' ),
					'default_timezone' => $this->input->post( 'default_timezone' ),
					'smtphost' => $this->input->post( 'smtphost' ),
					'smtpport' => $this->input->post( 'smtpport' ),
					'emailcharset' => $this->input->post( 'emailcharset' ),
					'smtpusername' => $this->input->post( 'smtpusername' ),
					'smtppassoword' => $this->input->post( 'smtppassoword' ),
					'sendermail' => $this->input->post( 'sendermail' ),
					'email_encryption' => $this->input->post( 'email_encryption' ),
					'accepted_files_formats' => $this->input->post( 'accepted_files_formats' ),
					'allowed_ip_adresses' => $this->input->post( 'allowed_ip_adresses' ),
					'pushState' => $PushState,
					'voicenotification' => $VoiceNotification,
					'paypalenable' => $paypalenable,
					'authorize_enable' => $authorize_enable,
					'paypalemail' => $this->input->post( 'paypalemail' ),
					'paypalsandbox' => $paypalsandbox,
					'paypalcurrency' => $this->input->post( 'paypalcurrency' ),
					'authorize_login_id' => $this->input->post( 'authorize_login_id' ),
					'authorize_transaction_key' => $this->input->post( 'authorize_transaction_key' ),
					'authorize_record_account' => $this->input->post( 'authorize_record_account' ),
					'paypal_record_account' => $this->input->post( 'paypal_record_account' ),
					'two_factor_authentication' => $two_factor_authentication,

				);
				$this->Settings_Model->update_settings( $settingname, $params );
				echo lang( 'settingsupdated' );
			}
		}
	}

	function removelogo( $settingname ) {
		$settings = $this->Settings_Model->get_settings( $settingname );

	}

	function change_logo() {
		if ( isset( $_POST ) ) {
			$config[ 'upload_path' ] = './uploads/ciuis_settings/';
			$config[ 'allowed_types' ] = 'zip|rar|tar|gif|jpg|png|jpeg|pdf|doc|docx|xls|xlsx|mp4|txt|csv|ppt|opt';
			$this->load->library( 'upload', $config );
			$this->upload->do_upload( 'file_name' );
			$data_upload_files = $this->upload->data();
			$image_data = $this->upload->data();
			$response = $this->db->update( 'settings', array( 'settingname' => 'ciuis', 'logo' => $image_data[ 'file_name' ] ) );
			redirect( 'settings' );
		}
	}

	function email_test() {
		$setconfig = $this->Settings_Model->get_settings_ciuis();
		$subject = 'Test';
		$to = $setconfig[ 'sendermail' ];
		$data = 'test';
		$body = 'Your email working good.';
		$result = send_email( $subject, $to, $data, $body );
		if ( $result ) {
			echo lang( 'mail_successfully_sent' );
		} else {
			echo lang( 'mail_not_sent' );
		}
	}

	function addlanguage() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$params = array(
				'langcode' => $_POST[ 'langcode' ],
				'name' => $_POST[ 'name' ],
				'foldername' => $_POST[ 'foldername' ],
			);
			$this->db->insert( 'languages', $params );
			$data[ 'insert_id' ] = $this->db->insert_id();;
			return json_encode( $data );
		}
	}

	function create_custom_field() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$params = array(
				'name' => $this->input->post( 'name' ),
				'type' => $this->input->post( 'type' ),
				'order' => $this->input->post( 'order' ),
				'data' => $this->input->post( 'data' ),
				'relation' => $this->input->post( 'relation' ),
				'icon' => $this->input->post( 'icon' ),
				'permission' => $this->input->post( 'permission' ),
			);
			$response = $this->Fields_Model->create_new_field( $params );
			if ( $response ) {
				echo 'Custom field created';
			} else {
				echo 'Custom field is not created';
			}
		}
	}

	function update_custom_field( $id ) {
		if ( isset( $id ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				$params = array(
					'name' => $this->input->post( 'name' ),
					'type' => $this->input->post( 'type' ),
					'order' => $this->input->post( 'order' ),
					'data' => $this->input->post( 'data' ),
					'relation' => $this->input->post( 'relation' ),
					'icon' => $this->input->post( 'icon' ),
					'permission' => $this->input->post( 'permission' ),
				);
				$response = $this->Fields_Model->update_custom_field( $id, $params );
				if ( $response ) {
					echo 'Custom field upted';
				} else {
					echo 'Custom field is not upted';
				}
			}
		} else {
			echo 'Custom field is not updated';
		}
	}

	function update_custom_field_status( $id, $value ) {
		if ( isset( $id ) ) {
			$this->db->where( 'id', $id );
			$response = $this->db->update( 'custom_fields', array( 'active' => $value ) );
		} else {
			echo 'Custom field status is not updated';
		}
	}

	function remove_custom_field( $id ) {
		if ( isset( $id ) ) {
			$response = $this->db->delete( 'custom_fields', array( 'id' => $id ) );
			if ( $response ) {
				echo 'Custom field removed';
			} else {
				echo 'Custom field is not removed';
			}
		} else {
			echo 'Custom field is not removed';
		}
	}
}