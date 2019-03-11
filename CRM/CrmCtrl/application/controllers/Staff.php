<?php
defined( 'BASEPATH' )OR exit( 'No direct script access allowed' );
class Staff extends CIUIS_Controller {

	function index() {
		$path = $this->uri->segment( 1 );
		if ( !$this->Privileges_Model->has_privilege( $path ) ) {
			$this->session->set_flashdata( 'ntf3', '' . lang( 'you_dont_have_permission' ) );
			redirect( 'panel/' );
			die;
		} else {
			$data[ 'title' ] = lang( 'staff' );
			$data[ 'staff' ] = $this->Staff_Model->get_all_staff();
			$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
			$data[ 'departments' ] = $this->Settings_Model->get_departments();
			$path = $this->uri->segment( 1 );
			if ( !$this->Privileges_Model->has_privilege( $path ) ) {
				$this->session->set_flashdata( 'ntf3', '' . lang( 'you_dont_have_permission' ) );
				redirect( 'panel/' );
				die;
			}
			$this->load->view( 'inc/header', $data );
			$this->load->view( 'staff/index', $data );
			$this->load->view( 'inc/footer', $data );
		}

	}

	function create() {
		if ( $this->Staff_Model->isDuplicate( $this->input->post( 'email' ) ) ) {
			echo lang( 'staffemailalreadyexists' );
		} else {
			$data[ 'title' ] = 'Add Staff';
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				switch ( $_POST[ 'admin' ] ) {
					case 'true':
						$is_Admin = 1;
						break;
					case 'false':
						$is_Admin = null;
						break;
				}
				switch ( $_POST[ 'staffmember' ] ) {
					case 'true':
						$is_Staff = 1;
						break;
					case 'false':
						$is_Staff = null;
						break;
				}
				switch ( $_POST[ 'inactive' ] ) {
					case 'true':
						$is_Active = null;
						break;
					case 'false':
						$is_Active = 0;
						break;
				}
				$params = array(
					'language' => $this->input->post( 'language' ),
					'staffname' => $this->input->post( 'name' ),
					'staffavatar' => 'n-img.jpg',
					'department_id' => $this->input->post( 'department' ),
					'phone' => $this->input->post( 'phone' ),
					'address' => $this->input->post( 'address' ),
					'email' => $this->input->post( 'email' ),
					'password' => md5( $this->input->post( 'password' ) ),
					'birthday' => $this->input->post( 'birthday' ),
					'admin' => $is_Admin,
					'staffmember' => $is_Staff,
					'inactive' => $is_Active,
				);
				$staff_id = $this->Staff_Model->add_staff( $params );
				// Custom Field Post
				if ( $this->input->post( 'custom_fields' ) ) {
					$custom_fields = array(
						'custom_fields' => $this->input->post( 'custom_fields' )
					);
					$this->Fields_Model->custom_field_data_add_or_update_by_type( $custom_fields, 'staff', $staff_id );
				}
				// Custom Field Post
				$setconfig = $this->Settings_Model->get_settings_ciuis();
				$subject = lang( 'your_login_informations' );
				$to = $this->input->post( 'email' );
				$data = array(
					'name' => $this->session->userdata( 'name' ),
					'password' => $this->input->post( 'password' ),
					'email' => $this->input->post( 'email' ),
					'loginlink' => '' . base_url( 'login' ) . ''
				);
				$body = $this->load->view( 'email/accountinfo.php', $data, TRUE );
				$result = send_email( $subject, $to, $data, $body );
				if ( $result ) {
					$message = sprintf( lang( 'addedstaff' ), $this->input->post( 'name' ) );
					echo $message;
				} else {
					$message = sprintf( lang( 'addedstaffbut' ), $this->input->post( 'name' ) );
					echo $message;
				}

			} else {
				$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
				$data[ 'languages' ] = $this->Settings_Model->get_languages();
				$data[ 'departments' ] = $this->Settings_Model->get_departments();
				$this->load->view( 'staff/add', $data );
			}

		}
	}

	function update( $id ) {
		if ( isset( $id ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				switch ( $_POST[ 'admin' ] ) {
					case 'true':
						$is_Admin = 1;
						break;
					case 'false':
						$is_Admin = null;
						break;
				}
				switch ( $_POST[ 'staffmember' ] ) {
					case 'true':
						$is_Staff = 1;
						break;
					case 'false':
						$is_Staff = null;
						break;
				}
				switch ( $_POST[ 'inactive' ] ) {
					case 'true':
						$is_Active = null;
						break;
					case 'false':
						$is_Active = 0;
						break;
				}
				$params = array(
					'language' => $this->input->post( 'language' ),
					'staffname' => $this->input->post( 'name' ),
					'department_id' => $this->input->post( 'department' ),
					'phone' => $this->input->post( 'phone' ),
					'address' => $this->input->post( 'address' ),
					'email' => $this->input->post( 'email' ),
					'birthday' => $this->input->post( 'birthday' ),
					'admin' => $is_Admin,
					'staffmember' => $is_Staff,
					'inactive' => $is_Active,
				);
				$this->Staff_Model->update_staff( $id, $params );
				$custom_fields = array(
					'custom_fields' => $this->input->post( 'custom_fields' )
				);
				$this->Fields_Model->custom_field_data_add_or_update_by_type( $custom_fields, 'staff', $id );
				echo lang( 'staffupdated' );
			}
		}
	}

	function update_privilege( $id, $value, $privilege_id ) {
		if ( $value != 'false' ) {
			$params = array(
				'relation' => ( int )$id,
				'relation_type' => 'staff',
				'permission_id' => ( int )$privilege_id
			);
			$this->db->insert( 'privileges', $params );
			return $this->db->insert_id();
		} else {
			$response = $this->db->delete( 'privileges', array( 'relation' => $id, 'relation_type' => 'staff', 'permission_id' => $privilege_id ) );
		}

	}

	function staffmember( $id ) {
		$data[ 'title' ] = lang( 'staffdetail' );
		$staff = $this->Staff_Model->get_staff( $id );
		if ( isset( $staff[ 'id' ] ) ) {
			$data[ 'id' ] = $staff[ 'id' ];
			$this->load->view( 'inc/header', $data );
			$this->load->view( 'staff/detail', $data );
			$this->load->view( 'inc/footer', $data );
		} else {
			redirect( 'staff/' );
		}
	}

	function change_avatar( $id ) {
		if ( isset( $id ) ) {
			if ( isset( $_POST ) ) {
				$config[ 'upload_path' ] = './uploads/images/';
				$config[ 'allowed_types' ] = 'gif|jpg|png|jpeg';
				$this->load->library( 'upload', $config );
				$this->upload->do_upload( 'file_name' );
				$data_upload_files = $this->upload->data();
				$image_data = $this->upload->data();
				$params = array(
					'staffavatar' => $image_data[ 'file_name' ],
				);
				$response = $this->Staff_Model->update_staff( $id, $params );
				redirect( 'staff/staffmember/' . $id . '' );
			}
		}
	}

	function remove( $id ) {
		$staff = $this->Staff_Model->get_staff( $id );
		// check if the staff exists before trying to delete it
		if ( isset( $staff[ 'id' ] ) ) {
			$this->Staff_Model->delete_staff( $id );
			redirect( 'staff/index' );
		} else
			show_error( 'The staff you are trying to delete does not exist.' );
	}

	function add_department() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$params = array(
				'name' => $this->input->post( 'name' ),
			);
			$department = $this->Settings_Model->add_department( $params );
			echo $department;
		}
	}

	function update_department( $id ) {
		$departments = $this->Settings_Model->get_department( $id );
		if ( isset( $departments[ 'id' ] ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				$params = array(
					'name' => $this->input->post( 'name' ),
				);
				$this->session->set_flashdata( 'ntf1', '<span><b>' . lang( 'departmentupdated' ) . '</b></span>' );
				$this->Settings_Model->update_department( $id, $params );
			}
		}
	}


	function update_workplan( $id ) {
		$workplan = $this->Staff_Model->get_work_plan( $id );
		if ( isset( $workplan[ 'id' ] ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				$response = $this->db->where( 'id', $workplan[ 'id' ] )->update( 'staff_work_plan', array( 'work_plan' => $this->input->post( 'work_plan' ) ) );
			}
			echo 'Staff work plan updated.';
		}
	}

	function remove_department( $id ) {
		$departments = $this->Settings_Model->get_department( $id );
		if ( isset( $departments[ 'id' ] ) ) {
			$this->Settings_Model->delete_department( $id );
			redirect( 'staff/index' );
		}
	}

	function appointment_availability( $id, $value ) {
		if ( $value === 'true' ) {
			$availability = 1;
		} else {
			$availability = 0;
		}
		if ( isset( $id ) ) {
			$response = $this->db->where( 'id', $id )->update( 'staff', array( 'appointment_availability' => $availability ) );
		};
	}

	function update_google_calendar( $id ) {
		$staff = $this->Staff_Model->get_staff( $id );
		if ( isset( $staff[ 'id' ] ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				$params = array(
					'google_calendar_id' => $this->input->post( 'google_calendar_id' ),
					'google_calendar_api_key' => $this->input->post( 'google_calendar_api_key' ),
					'google_calendar_enable' => $this->input->post( 'google_calendar_enable' ),
				);
				$this->Staff_Model->update_staff( $id, $params );
				$notification = array(
					'color' => 'color success',
					'message' => lang( 'google_calendar_settings_updated' )
				);
				echo json_encode( $notification );
			} else {
				$notification = array(
					'color' => 'color danger',
					'message' => lang( 'google_calendar_settings_not_updated' )
				);
				echo json_encode( $notification );
			}
		} else
			show_error( 'The staff you are trying to update google calendar settings does not exist.' );
	}

	function changestaffpassword( $id ) {
		$staff = $this->Staff_Model->get_staff( $id );
		if ( isset( $staff[ 'id' ] ) ) {
			if ( isset( $_POST ) && count( $_POST ) > 0 ) {
				$params = array(
					'password' => md5( $this->input->post( 'password' ) ),
				);
				$setconfig = $this->Settings_Model->get_settings_ciuis();
				$subject = lang( 'your_password_changed' );
				$to = $staff[ 'email' ];
				$data = array(
					'name' => $this->session->userdata( 'staffname' ),
					'password' => $this->input->post( 'password' ),
					'email' => $staff[ 'email' ],
					'loginlink' => '' . base_url( 'login' ) . ''
				);
				$body = $this->load->view( 'email/passwordchanged.php', $data, TRUE );
				$result = send_email( $subject, $to, $data, $body );
				if ( $result ) {
					$staffname1 = $this->session->staffname;
					$staffname2 = $staff[ 'staffname' ];
					$loggedinuserid = $this->session->usr_id;
					$this->db->insert( 'logs', array(
						'date' => date( 'Y-m-d H:i:s' ),
						'detail' => ( '' . $message = sprintf( lang( 'changedstaffpassword' ), $staffname1, $staffname2 ) . '' ),
						'staff_id' => $loggedinuserid,
					) );
					$this->Staff_Model->update_staff( $id, $params );
					$this->session->set_flashdata( 'ntf1', ' ' . $staff[ 'staffname' ] . ' ' . lang( 'passwordchanged' ) . '' );
					echo ' ' . $staff[ 'staffname' ] . ' ' . lang( 'passwordchanged' ) . '';
				} else {
					$staffname1 = $this->session->staffname;
					$staffname2 = $staff[ 'staffname' ];
					$loggedinuserid = $this->session->usr_id;
					$this->db->insert( 'logs', array(
						'date' => date( 'Y-m-d H:i:s' ),
						'detail' => ( '' . $message = sprintf( lang( 'changedstaffpassword' ), $staffname1, $staffname2 ) . '' ),
						'staff_id' => $loggedinuserid,
					) );
					$this->Staff_Model->update_staff( $id, $params );
					$this->session->set_flashdata( 'ntf4', ' ' . $staff[ 'staffname' ] . ' ' . lang( 'passwordchangedbut' ) . '' );
					echo ' ' . $staff[ 'staffname' ] . ' ' . lang( 'passwordchangedbut' ) . '';
				}

			} else {
				$data[ 'staff' ] = $this->Staff_Model->get_staff( $id );
			}
		} else
			show_error( 'The staff you are trying to update password does not exist.' );
	}
}