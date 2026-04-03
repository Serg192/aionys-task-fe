describe("Notes - Create Note", () => {
  it("should create a new note", () => {
    cy.visit("http://localhost:3000/notes");

    cy.get('[data-testid="add-note-button"]').click();

    const noteTitle = "Cypress Test Note";
    const noteContent = "This note was created by Cypress E2E";

    cy.get('[data-testid="note-title-input"]').type(noteTitle);
    cy.get('[data-testid="note-content-textarea"]').type(noteContent);

    cy.get('[data-testid="save-note-button"]').click();

    cy.get('[data-testid="note-edit-modal"]').should("not.exist");

    cy.contains(noteTitle).should("exist");
    cy.contains(noteContent).should("exist");
  });
});
