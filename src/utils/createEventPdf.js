import PDFDocument from 'pdfkit';

export const createEventPdf = async (details, dataCallback, endCallback) => {
    const doc = new PDFDocument({ margin: 50 });
    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    // Title of the event
    doc.fontSize(20).font('Helvetica-Bold').text(details.event_name, { align: 'center' });
    
    // Ticket ID (sample ID shown, you might replace it with an actual ID if available)
    doc.fontSize(12).text(`#TKT-${details.registration_id || 'XXXXXXXX-XXXX'}`, { align: 'center', lineGap: 10 });
    
    doc.moveDown(1); // Add some space

    // Event details
    doc.fontSize(12).font('Helvetica-Bold').text('Date:', { continued: true });
    doc.font('Helvetica').text(`  ${details.date}`);
    
    doc.font('Helvetica-Bold').text('Time:', { continued: true });
    doc.font('Helvetica').text(`  ${details.time}`);
    
    doc.font('Helvetica-Bold').text('Venue:', { continued: true });
    doc.font('Helvetica').text(`  ${details.venue || 'TBA'}`);
    
    doc.font('Helvetica-Bold').text('Type:', { continued: true });
    doc.font('Helvetica').text(`  ${details.type || 'Standard'}`);
    
    doc.font('Helvetica-Bold').text('Seat:', { continued: true });
    doc.font('Helvetica').text(`  ${details.seat || 'Open Seating'}`);
    
    doc.font('Helvetica-Bold').text('Price:', { continued: true });
    doc.font('Helvetica').text(`  ${details.price || 'Free'}`);
    
    doc.font('Helvetica-Bold').text('Organizer:', { continued: true });
    doc.font('Helvetica').text(`  ${details.organizer || 'Event Organizer'}`);

    doc.moveDown(1); // Space for footer text

    // Footer text
    doc.fontSize(10).font('Helvetica').text(
        'Valid for 24 hours from event start\nThis ticket is non-transferable\nSingle entry only. Bring ID.',
        { align: 'center', lineGap: 5 }
    );

    doc.end();
};
