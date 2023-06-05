import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const SearchTasks = () => (
    <Container className="mt-3">
        <h4>Search Tasks</h4>
        <Form id="searchForm">
            <Row>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label htmlFor="taskNameSearch">Task Name</Form.Label>
                        <Form.Control type="text" id="taskNameSearch" placeholder="Search By Name" />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="multipleDelete">
                        <Form.Label htmlFor="taskCategorySearch">Task Category</Form.Label>
                        <Form.Check type="checkbox" id="workRelated" name="taskCategory" value="Work-related" label="Work-related" />
                        <Form.Check type="checkbox" id="personal" name="taskCategory" value="Personal" label="Personal" />
                        <Form.Check type="checkbox" id="academic" name="taskCategory" value="Academic" label="Academic" />
                        {/* Add checkboxes for other task categories */}
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label htmlFor="taskStatusSearch">Task Status</Form.Label>
                        <Form.Check type="radio" id="notStarted" name="taskStatus" value="Not Started" label="Not Started" />
                        <Form.Check type="radio" id="inProgress" name="taskStatus" value="In Progress" label="In Progress" />
                        <Form.Check type="radio" id="completed" name="taskStatus" value="Completed" label="Completed" />
                        {/* Add radio buttons for other task statuses */}
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label htmlFor="responsiblePersonSearch">Responsible Person:</Form.Label>
                        <Form.Control as="select" id="responsiblePersonSearch">
                            <option value="">All</option>
                            <option value="Hridu">Hridu</option>
                            <option value="Awwab">Awwab</option>
                            <option value="Azhar">Azhar</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label htmlFor="endDateSearch">End Date</Form.Label>
                        <Form.Control type="date" id="endDateSearch" />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label htmlFor="endDateSearch" className="invisible">Search</Form.Label>
                        <Button type="submit" variant="primary" block>Search</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    </Container>
);

export default SearchTasks;
