<?php
defined( 'BASEPATH' )OR exit( 'No direct script access allowed' );
class Tickets extends AREA_Controller {


	function index() {
		$data[ 'title' ] = lang( 'areatitletickets' );
		$data[ 'ttc' ] = $this->Area_Model->ttc();
		$data[ 'otc' ] = $this->Area_Model->otc();
		$data[ 'ipc' ] = $this->Area_Model->ipc();
		$data[ 'atc' ] = $this->Area_Model->atc();
		$data[ 'ctc' ] = $this->Area_Model->ctc();
		$data[ 'ysy' ] = ( $data[ 'ttc' ] > 0 ? number_format( ( $data[ 'otc' ] * 100 ) / $data[ 'ttc' ] ) : 0 );
		$data[ 'bsy' ] = ( $data[ 'ttc' ] > 0 ? number_format( ( $data[ 'ipc' ] * 100 ) / $data[ 'ttc' ] ) : 0 );
		$data[ 'twy' ] = ( $data[ 'ttc' ] > 0 ? number_format( ( $data[ 'atc' ] * 100 ) / $data[ 'ttc' ] ) : 0 );
		$data[ 'iey' ] = ( $data[ 'ttc' ] > 0 ? number_format( ( $data[ 'ctc' ] * 100 ) / $data[ 'ttc' ] ) : 0 );
		$data[ 'tickets' ] = $this->db->select( '*,customers.type as type,customers.company as company,customers.namesurname as namesurname,departments.name as department,staff.staffname as staffmembername,contacts.name as contactname,contacts.surname as contactsurname,tickets.staff_id as stid, tickets.id as id ' )->join( 'contacts', 'tickets.contact_id = contacts.id', 'left' )->join( 'customers', 'contacts.customer_id = customers.id', 'left' )->join( 'departments', 'tickets.department_id = departments.id', 'left' )->join( 'staff', 'tickets.staff_id = staff.id', 'left' )->get_where( 'tickets', array( 'contact_id' => $_SESSION[ 'contact_id' ] ) )->result_array();
		$data[ 'departments' ] = $this->db->get_where( 'departments', array( '' ) )->result_array();
		//Detaylar
		$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
		$this->load->view( 'area/inc/header', $data );
		$this->load->view( 'area/tickets/index', $data );
		$this->load->view( 'area/inc/footer', $data );

	}

	function create_ticket() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$config[ 'upload_path' ] = './uploads/attachments/';
			$config[ 'allowed_types' ] = 'zip|rar|tar|gif|jpg|png|jpeg|pdf|doc|docx|xls|xlsx|mp4|txt|csv|ppt|opt';
			$this->load->library( 'upload', $config );
			$this->upload->do_upload( 'attachment' );
			$data_upload_files = $this->upload->data();
			$image_data = $this->upload->data();
			$params = array(
				'contact_id' => $_SESSION[ 'contact_id' ],
				'customer_id' => $_SESSION[ 'customer' ],
				'email' => $_SESSION[ 'email' ],
				'department_id' => $this->input->post( 'department' ),
				'priority' => $this->input->post( 'priority' ),
				'status_id' => 1,
				'subject' => $this->input->post( 'subject' ),
				'message' => $this->input->post( 'message' ),
				'attachment' => $image_data[ 'file_name' ],
				'date' => date( " Y.m.d H:i:s " ),
			);
			$this->session->set_flashdata( 'ntf1', 'Ticket added' );
			$tickets_id = $this->Area_Model->add_tickets( $params );
			redirect( 'area/tickets' );
		}
	}

	function ticket( $id ) {
		$data[ 'title' ] = lang( 'areatitletickets' );
		$data[ 'ticketstatustitle' ] = 'All Tickets';
		$data[ 'ttc' ] = $this->Area_Model->ttc();
		$data[ 'otc' ] = $this->Area_Model->otc();
		$data[ 'ipc' ] = $this->Area_Model->ipc();
		$data[ 'atc' ] = $this->Area_Model->atc();
		$data[ 'ctc' ] = $this->Area_Model->ctc();
		$data[ 'ysy' ] = ( $data[ 'ttc' ] > 0 ? number_format( ( $data[ 'otc' ] * 100 ) / $data[ 'ttc' ] ) : 0 );
		$data[ 'bsy' ] = ( $data[ 'ttc' ] > 0 ? number_format( ( $data[ 'ipc' ] * 100 ) / $data[ 'ttc' ] ) : 0 );
		$data[ 'twy' ] = ( $data[ 'ttc' ] > 0 ? number_format( ( $data[ 'atc' ] * 100 ) / $data[ 'ttc' ] ) : 0 );
		$data[ 'iey' ] = ( $data[ 'ttc' ] > 0 ? number_format( ( $data[ 'ctc' ] * 100 ) / $data[ 'ttc' ] ) : 0 );
		$data[ 'ticket' ] = $this->Tickets_Model->get_tickets( $id );
		$data[ 'dtickets' ] = $this->db->select( '*,customers.type as type,customers.company as company,customers.namesurname as namesurname,departments.name as department,staff.staffname as staffmembername,contacts.name as contactname,contacts.surname as contactsurname,tickets.staff_id as stid, tickets.id as id ' )->join( 'contacts', 'tickets.contact_id = contacts.id', 'left' )->join( 'customers', 'contacts.customer_id = customers.id', 'left' )->join( 'departments', 'tickets.department_id = departments.id', 'left' )->join( 'staff', 'tickets.staff_id = staff.id', 'left' )->get_where( 'tickets', array( 'contact_id' => $_SESSION[ 'contact_id' ] ) )->result_array();
		$data[ 'settings' ] = $this->Settings_Model->get_settings_ciuis();
		$this->load->view( 'area/inc/header', $data );
		$this->load->view( 'area/tickets/ticket', $data );
		$this->load->view( 'area/inc/footer', $data );
	}

	function reply( $id ) {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$ticket = $this->Tickets_Model->get_tickets( $id );
			$config[ 'upload_path' ] = './uploads/attachments/';
			$config[ 'allowed_types' ] = 'zip|rar|tar|gif|jpg|png|jpeg|pdf|doc|docx|xls|xlsx|mp4|txt|csv|ppt|opt';
			$this->load->library( 'upload', $config );
			$this->upload->do_upload( 'attachment' );
			$data_upload_files = $this->upload->data();
			$image_data = $this->upload->data();
			$params = array(
				'ticket_id' => $id,
				'staff_id' => $ticket[ 'staff_id' ],
				'contact_id' => $_SESSION[ 'contact_id' ],
				'date' => date( " Y.m.d H:i:s " ),
				'name' => $_SESSION[ 'name' ],
				'message' => $this->input->post( 'message' ),
				'attachment' => $image_data[ 'file_name' ],
			);
			$contact = $_SESSION[ 'name' ];
			$contactavatar = 'n-img.png';
			$this->db->insert( 'notifications', array(
				'date' => date( 'Y-m-d H:i:s' ),
				'detail' => ( '' . $contact . ' replied ' . lang( 'ticket' ) . '-' . $id . '' ),
				'perres' => $contactavatar,
				'staff_id' => $ticket[ 'staff_id' ],
				'target' => '' . base_url( 'tickets/ticket/' . $id . '' ) . ''
			) );
			$response = $this->db->where( 'id', $id )->update( 'tickets', array(
				'status_id' => 1,
				'lastreply' => date( "Y.m.d H:i:s " ),
			) );
			// SEND EMAIL SETTINGS
			$setconfig = $this->Settings_Model->get_settings_ciuis();
			$staff = $this->Staff_Model->get_staff( $ticket[ 'staff_id' ] );
			$subject = lang( 'customerrepliedticket' );
			$to = $staff['email'];
			$data = array(
				'name' => $_SESSION[ 'name' ],
				'ticketlink' => '' . base_url( 'tickets/ticket/' . $id . '' ) . ''
			);
			$body = $this->load->view( 'email/ticket.php', $data, TRUE );
			$result = send_email( $subject, $to, $data, $body );
			$replyid = $this->Tickets_Model->add_reply_contact( $params );
			redirect( 'area/tickets/ticket/' . $id . '' );
		}
	}
}