# X Group Corporate Documents

This directory contains corporate profile documents for X Group Holdings Inc.

## Files

### x-group-profile-template.html
HTML template for the X Group corporate profile. This is formatted for PDF conversion and includes proper letterhead styling.

**Status:** Template ready for conversion. Awaiting finalized A2/A3 corporate facts (legal name, incorporation number, registered office address).

**To generate PDF:**

1. Update the `[TO BE PROVIDED]` placeholders in the template with actual corporate registry facts
2. Ensure the legal line matches exactly across all website pages (index.html, international.html, delegations.html, ru/index.html footers)
3. Use wkhtmltopdf to convert to PDF:

```bash
wkhtmltopdf \
  --margin-top 20mm \
  --margin-bottom 30mm \
  --margin-left 20mm \
  --margin-right 20mm \
  --enable-local-file-access \
  x-group-profile-template.html \
  x-group-profile.pdf
```

4. Verify the PDF displays correctly on all pages with proper letterhead formatting
5. Test that the PDF is suitable for visa applications and corporate correspondence

### x-group-profile.pdf
**Status:** NOT YET GENERATED. Will be created once A2/A3 corporate facts are finalized.

**Target deliverables:**
- English version (x-group-profile.pdf)
- Russian version (x-group-profile-ru.pdf) — after Russian translation review

**Download links on:**
- /group-profile.html
- /international.html
- /delegations.html

## Notes

- The letterhead identity (company name, address, incorporation details) must byte-match the footer legal line across all website pages
- Consulates and government agencies check for consistency in company registration details
- PDF should be suitable for IRCC visa applications
- Once A3 facts are final, update this README with generation date and version info
