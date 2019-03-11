<?php
defined( 'BASEPATH' )OR exit( 'No direct script access allowed' );
class Trivia extends CIUIS_Controller {

	function index() {
		echo 'Trivia';
	}

	function addtodo() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$params = array(
				'description' => $_POST[ 'tododetail' ],
				'staff_id' => $this->session->userdata( 'usr_id' ),
				'date' => date( 'Y-m-d H:i:s' ),
			);
			$this->db->insert( 'todo', $params );
			$data[ 'insert_id' ] = $this->db->insert_id();;
			return json_encode( $data );
		}
	}

	function donetodo() {
		if ( isset( $_POST[ 'todo' ] ) ) {
			$todo = $_POST[ 'todo' ];
			$response = $this->db->where( 'id', $todo )->update( 'todo', array( 'done' => 1 ) );
		}
	}

	function undonetodo() {
		if ( isset( $_POST[ 'todo' ] ) ) {
			$todo = $_POST[ 'todo' ];
			$response = $this->db->where( 'id', $todo )->update( 'todo', array( 'done' => 0 ) );
		}
	}

	function removetodo() {
		$this->Trivia_Model->removetodo();
	}

	function addnote() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$params = array(
				'relation_type' => $_POST[ 'relation_type' ],
				'relation' => $_POST[ 'relation' ],
				'description' => $_POST[ 'description' ],
				'addedfrom' => $this->session->userdata( 'usr_id' ),
				'created' => date( 'Y-m-d H:i:s' ),
			);
			$this->db->insert( 'notes', $params );
			$data[ 'insert_id' ] = $this->db->insert_id();;
			echo json_encode( $data );
		}
	}
	
	function set_onsite_visit() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$params = array(
				'title' => $_POST[ 'title' ],
				'description' => $_POST[ 'description' ],
				'customer_id' => $_POST[ 'customer_id' ],
				'staff_id' => $_POST[ 'staff_id' ],
				'date' => $_POST[ 'date' ],
				'start' => $_POST[ 'start' ],
				'end' => $_POST[ 'end' ],
			);
			$this->db->insert( 'meetings', $params );
			echo 'Onsite visit added successfully!';
		}
	}

	function create_discussion() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			switch ( $this->input->post( 'show_to_customer' ) ) {
				case 'true':
					$show_to_customer_value = 1;
					break;
				case 'false':
					$show_to_customer_value = 0;
					break;
			}
			$params = array(
				'relation_type' => $_POST[ 'relation_type' ],
				'relation' => $_POST[ 'relation' ],
				'subject' => $_POST[ 'subject' ],
				'description' => $_POST[ 'description' ],
				'contact_id' => $_POST[ 'contact_id' ],
				'staff_id' => $_POST[ 'staff_id' ],
				'show_to_customer' => $show_to_customer_value,
				'datecreated' => date( 'Y-m-d H:i:s' ),
			);
			$this->db->insert( 'discussions', $params );
			$data[ 'insert_id' ] = $this->db->insert_id();;
			echo json_encode( $data );
		}
	}

	function add_discussion_comment() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$params = array(
				'discussion_id' => $_POST[ 'discussion_id' ],
				'content' => $_POST[ 'content' ],
				'staff_id' => $this->session->userdata( 'usr_id' ),
				'contact_id' => $_POST[ 'contact_id' ],
				'full_name' => $_POST[ 'full_name' ],
				'created' => date( 'Y-m-d H:i:s' ),
			);
			$this->db->insert( 'discussion_comments', $params );
			$data[ 'insert_id' ] = $this->db->insert_id();;
			echo json_encode( $data );
		}
	}

	function addreminder() {
		if ( isset( $_POST ) && count( $_POST ) > 0 ) {
			$params = array(
				'relation_type' => $_POST[ 'relation_type' ],
				'relation' => $_POST[ 'relation' ],
				'description' => $_POST[ 'description' ],
				'staff_id' => $_POST[ 'staff' ],
				'addedfrom' => $this->session->userdata( 'usr_id' ),
				'date' => $_POST[ 'date' ],
			);
			$this->db->insert( 'reminders', $params );
			$data[ 'insert_id' ] = $this->db->insert_id();;
			echo json_encode( $data );
		}
	}

	function removenote() {
		$this->Trivia_Model->removenote();
	}

	function removereminder() {
		$this->Trivia_Model->removereminder();
	}

	function markreadreminder() {
		if ( isset( $_POST[ 'reminder_id' ] ) ) {
			$response = $this->db->where( 'id', $_POST[ 'reminder_id' ] )->update( 'reminders', array( 'isnotified' => 1 ) );
		}
	}

	function mark_read_notification( $id ) {
		if ( isset( $id ) ) {
			$response = $this->db->where( 'id', $id )->update( 'notifications', array( 'markread' => ( '1' ) ) );
		}
	}
}