// export const mainInstructions =
//   'You are a resume analyser for IT firm with the resume file provided'
export const mainInstructions =
  'Generate a table from the provided P&ID with the following columns:\n\n' +
  'For Equipment:\n' +
  '- Equipment Name: Identify the main equipment units on the diagram (e.g., pumps, compressors, heat exchangers).\n' +
  '- Equipment Number: List the unique tag number associated with each equipment unit.\n' +
  "- Description: Provide a brief description of each equipment's function based on standard industry knowledge.\n\n" +
  'For Instruments:\n' +
  '- Instrument Name: Identify the instruments (e.g., pressure gauges, level transmitters) shown on the P&ID.\n' +
  '- Instrument Number: List the unique tag number associated with each instrument.\n' +
  '- Description: Provide a brief description of the primary function of each instrument.\n\n' +
  'For Pipelines:\n' +
  '- Line Number: Identify the line number as labeled on the P&ID.\n' +
  '- Description: Describe the service of the line (what it carries, like steam or oil) and any notable specifications (such as pressure rating or temperature).\n\n' +
  'Please ensure accuracy by cross-referencing the P&ID symbols with a standard legend and verify descriptions against equipment specifications or operational manuals where available.'

export const functionDesc: any = [
  {
    type: 'function',
    function: {
      name: 'analyze_pid',
      parameters: {
        type: 'object',
        properties: {
          image_file: {
            type: 'string',
            description:
              'The file path or URL to the P&ID image to be processed.',
            format: 'binary'
          },
          pdf_file: {
            type: 'string',
            description:
              'The file path or URL to the P&ID PDF to be processed.',
            format: 'binary'
          }
        },
        required: ['image_file', 'pdf_file']
      },
      description:
        'Analyzes a P&ID provided in both image and PDF formats to generate detailed tables for equipment, instruments, and pipelines.'
    }
  }
]
