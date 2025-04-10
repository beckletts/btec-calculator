import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Select,
  SelectChangeEvent,
  MenuItem, 
  FormControl, 
  InputLabel,
  Button,
  Alert,
  Chip,
  ThemeProvider,
  createTheme,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grade, Unit, Qualification, GradeResult } from '../types';

// Create Pearson theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1C0C38', // Deep purple
      light: '#8C52FF',
    },
    secondary: {
      main: '#FF52B4',
    },
    background: {
      default: '#F8F7FA', // Light purple-tinted background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C0C38',
      secondary: '#666666',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#1C0C38',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#1C0C38',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(28, 12, 56, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '12px 32px',
          textTransform: 'none',
          fontWeight: 600,
          backgroundColor: '#6B2FBC',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#8C52FF',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        filledPrimary: {
          backgroundColor: '#E8E1F8',
          color: '#1C0C38',
        },
        filledSecondary: {
          backgroundColor: '#FFE1F3',
          color: '#B01875',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            backgroundColor: '#6B2FBC',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          '&.Mui-selected': {
            color: '#6B2FBC',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '0 0 8px 0',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          '&.Mui-expanded': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 8,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        standardInfo: {
          backgroundColor: '#E8E1F8',
          color: '#1C0C38',
        },
        standardWarning: {
          backgroundColor: '#FFF4E5',
          color: '#663C00',
        },
        standardError: {
          backgroundColor: '#FFE9E9',
          color: '#660000',
        },
      },
    },
  },
});

type QualificationLevel = 'certificate' | 'extendedCertificate' | 'foundation' | 'diploma' | 'extendedDiploma';

const qualificationLevels = {
  certificate: {
    name: 'Certificate',
    totalCredits: 180,
    requiredPassCredits: 135,
    requiredMeritCredits: 158,
    requiredDistinctionCredits: 180,
    glh: 180,
    tqt: 240,
    structure: {
      totalUnits: 2,
      mandatoryUnits: 2,
      externalUnits: 1,
      mandatoryContent: 100,
      externalAssessment: 50
    },
    description: 'Equivalent in size to 0.5 of an A Level. Offers an introduction to business through applied learning.'
  },
  extendedCertificate: {
    name: 'Extended Certificate',
    totalCredits: 360,
    requiredPassCredits: 270,
    requiredMeritCredits: 315,
    requiredDistinctionCredits: 360,
    glh: 360,
    tqt: 480,
    structure: {
      totalUnits: 4,
      mandatoryUnits: 3,
      externalUnits: 2,
      mandatoryContent: 83,
      externalAssessment: 58
    },
    description: 'Equivalent in size to one A Level. Designed for studying business alongside other fields.'
  },
  foundation: {
    name: 'Foundation Diploma',
    totalCredits: 510,
    requiredPassCredits: 383,
    requiredMeritCredits: 446,
    requiredDistinctionCredits: 510,
    glh: 510,
    tqt: 670,
    structure: {
      totalUnits: 6,
      mandatoryUnits: 4,
      externalUnits: 2,
      mandatoryContent: 76,
      externalAssessment: 41
    },
    description: 'Equivalent in size to 1.5 A Levels. Suitable as a one-year, full-time course.'
  },
  diploma: {
    name: 'Diploma',
    totalCredits: 720,
    requiredPassCredits: 540,
    requiredMeritCredits: 630,
    requiredDistinctionCredits: 720,
    glh: 720,
    tqt: 950,
    structure: {
      totalUnits: 8,
      mandatoryUnits: 6,
      externalUnits: 3,
      mandatoryContent: 83,
      externalAssessment: 45
    },
    description: 'Equivalent in size to two A Levels. Designed as the substantive part of a 16-19 study programme.'
  },
  extendedDiploma: {
    name: 'Extended Diploma',
    totalCredits: 1080,
    requiredPassCredits: 810,
    requiredMeritCredits: 945,
    requiredDistinctionCredits: 1080,
    glh: 1080,
    tqt: 1430,
    structure: {
      totalUnits: 13,
      mandatoryUnits: 7,
      externalUnits: 4,
      mandatoryContent: 66,
      externalAssessment: 42
    },
    description: 'Equivalent in size to three A Levels. A two-year, full-time course meeting higher education entry requirements.'
  },
};

const initialQualification: Qualification = {
  name: 'BTEC Level 3 National Extended Diploma in Business',
  totalCredits: 1080, // Total GLH for Extended Diploma
  requiredPassCredits: 810, // 75% of total credits
  requiredMeritCredits: 945, // 87.5% of total credits
  requiredDistinctionCredits: 1080, // 100% of total credits
  units: [
    { id: '1', number: 1, title: 'Exploring Business', size: 90, isMandatory: true, isExternal: false, grade: null, credits: 90 },
    { id: '2', number: 2, title: 'Developing a Marketing Campaign', size: 90, isMandatory: true, isExternal: true, grade: null, credits: 90 },
    { id: '3', number: 3, title: 'Personal and Business Finance', size: 120, isMandatory: true, isExternal: true, grade: null, credits: 120 },
    { id: '4', number: 4, title: 'Managing an Event', size: 90, isMandatory: true, isExternal: false, grade: null, credits: 90 },
    { id: '5', number: 5, title: 'International Business', size: 90, isMandatory: true, isExternal: false, grade: null, credits: 90 },
    { id: '6', number: 6, title: 'Principles of Management', size: 120, isMandatory: true, isExternal: false, grade: null, credits: 120 },
    { id: '7', number: 7, title: 'Business Decision Making', size: 120, isMandatory: true, isExternal: true, grade: null, credits: 120 },
    { id: '8', number: 8, title: 'Recruitment and Selection Process', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '9', number: 9, title: 'Team Building in Business', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '10', number: 10, title: 'Recording Financial Transactions', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '11', number: 11, title: 'Final Accounts for Public Limited Companies', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '12', number: 12, title: 'Financial Statements for Specific Businesses', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '13', number: 13, title: 'Cost and Management Accounting', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '14', number: 14, title: 'Investigating Customer Service', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '15', number: 15, title: 'Investigating Retail Business', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '16', number: 16, title: 'Visual Merchandising', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '17', number: 17, title: 'Digital Marketing', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '18', number: 18, title: 'Creative Promotion', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '19', number: 19, title: 'Pitching for a New Business', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '20', number: 20, title: 'Investigating Corporate Social Responsibility', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '21', number: 21, title: 'Training and Development', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '22', number: 22, title: 'Market Research', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '23', number: 23, title: 'The English Legal System', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '24', number: 24, title: 'Employment Law', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '25', number: 25, title: 'Aspects of Civil Liability Affecting Business', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '26', number: 26, title: 'Aspects of Criminal Law Impacting on Business and Individuals', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '27', number: 27, title: 'Work Experience in Business', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '28', number: 28, title: 'Branding', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '29', number: 29, title: 'Relationship Marketing', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '30', number: 30, title: 'Legal Principles and Professional Ethics in Financial Services', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '31', number: 31, title: 'Effective Management of Personal Debt', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '32', number: 32, title: 'Buying for Business', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '33', number: 33, title: 'Supply Chain Operations', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '34', number: 34, title: 'Investment Opportunities and Financial Planning', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 },
    { id: '35', number: 35, title: 'Insurance Principles and Policies', size: 60, isMandatory: false, isExternal: false, grade: null, credits: 60 }
  ]
};

const calculateGrade = (qualification: Qualification): GradeResult => {
  let totalCredits = 0;
  let passCredits = 0;
  let meritCredits = 0;
  let distinctionCredits = 0;
  let mandatoryUnitsComplete = true;
  let externalUnitsComplete = true;

  qualification.units.forEach(unit => {
    if (unit.grade) {
      totalCredits += unit.credits;
      switch (unit.grade) {
        case 'D':
          distinctionCredits += unit.credits;
          meritCredits += unit.credits;
          passCredits += unit.credits;
          break;
        case 'M':
          meritCredits += unit.credits;
          passCredits += unit.credits;
          break;
        case 'P':
          passCredits += unit.credits;
          break;
      }
    } else if (unit.isMandatory) {
      mandatoryUnitsComplete = false;
    } else if (unit.isExternal) {
      externalUnitsComplete = false;
    }
  });

  let overallGrade: Grade = 'U';
  if (mandatoryUnitsComplete && externalUnitsComplete) {
    if (distinctionCredits >= qualification.requiredDistinctionCredits) {
      overallGrade = 'D';
    } else if (meritCredits >= qualification.requiredMeritCredits) {
      overallGrade = 'M';
    } else if (passCredits >= qualification.requiredPassCredits) {
      overallGrade = 'P';
    }
  }

  return {
    overallGrade,
    totalCredits,
    passCredits,
    meritCredits,
    distinctionCredits,
    mandatoryUnitsComplete,
    externalUnitsComplete
  };
};

const BTECCalculator: React.FC = () => {
  const [qualification, setQualification] = useState<Qualification>(initialQualification);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<QualificationLevel>('extendedDiploma');
  const [selectedTab, setSelectedTab] = useState(0);

  const handleLevelChange = (event: SelectChangeEvent<QualificationLevel>) => {
    const level = event.target.value as QualificationLevel;
    setSelectedLevel(level);
    setQualification(prev => ({
      ...prev,
      ...qualificationLevels[level]
    }));
    setResult(null);
  };

  const handleGradeChange = (unitId: string, grade: Grade) => {
    setQualification(prev => ({
      ...prev,
      units: prev.units.map(unit => 
        unit.id === unitId ? { ...unit, grade } : unit
      )
    }));
  };

  const handleCalculate = () => {
    const calculatedResult = calculateGrade(qualification);
    setResult(calculatedResult);
  };

  // Group units by type
  const mandatoryUnits = qualification.units.filter(unit => unit.isMandatory);
  const optionalUnits = qualification.units.filter(unit => !unit.isMandatory);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        pt: 4,
        pb: 8
      }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              BTEC Grade Calculator
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 600, mx: 'auto' }}>
              Calculate your BTEC Level 3 National Business grade. Get support when you need it with our comprehensive grade calculator.
            </Typography>

            <Paper sx={{ p: 3, mb: 4, maxWidth: 600, mx: 'auto' }}>
              <FormControl fullWidth>
                <InputLabel>Qualification Level</InputLabel>
                <Select
                  value={selectedLevel}
                  label="Qualification Level"
                  onChange={handleLevelChange}
                  sx={{ mb: 2 }}
                >
                  {Object.entries(qualificationLevels).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(28, 12, 56, 0.03)', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {qualificationLevels[selectedLevel].description}
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mt: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Guided Learning Hours (GLH)</Typography>
                    <Typography variant="body1">{qualificationLevels[selectedLevel].glh} hours</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Total Qualification Time (TQT)</Typography>
                    <Typography variant="body1">{qualificationLevels[selectedLevel].tqt} hours</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mt: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Total Units</Typography>
                    <Typography variant="body1">{qualificationLevels[selectedLevel].structure.totalUnits}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Mandatory Units</Typography>
                    <Typography variant="body1">{qualificationLevels[selectedLevel].structure.mandatoryUnits}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">External Units</Typography>
                    <Typography variant="body1">{qualificationLevels[selectedLevel].structure.externalUnits}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mt: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Mandatory Content</Typography>
                    <Typography variant="body1">{qualificationLevels[selectedLevel].structure.mandatoryContent}%</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">External Assessment</Typography>
                    <Typography variant="body1">{qualificationLevels[selectedLevel].structure.externalAssessment}%</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
          
          <Paper sx={{ p: 4, mb: 4 }}>
            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Mandatory Units" />
              <Tab label="Optional Units" />
            </Tabs>

            <Box sx={{ display: selectedTab === 0 ? 'block' : 'none' }}>
              {mandatoryUnits.map((unit) => (
                <Accordion key={unit.id} sx={{ mb: 1, bgcolor: 'background.paper' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1 }}>
                      <Typography sx={{ flexGrow: 1 }}>
                        {unit.number}. {unit.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, minWidth: 160 }}>
                        <Chip label="Mandatory" size="small" color="primary" />
                        {unit.isExternal && <Chip label="External" size="small" color="secondary" />}
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FormControl sx={{ minWidth: 120 }}>
                        <Select
                          value={unit.grade || ''}
                          onChange={(e) => handleGradeChange(unit.id, e.target.value as Grade)}
                          size="small"
                        >
                          <MenuItem value="D">Distinction</MenuItem>
                          <MenuItem value="M">Merit</MenuItem>
                          <MenuItem value="P">Pass</MenuItem>
                          <MenuItem value="U">Ungraded</MenuItem>
                        </Select>
                      </FormControl>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Credits: {unit.credits}
                      </Typography>
                      {unit.grade && (
                        <LinearProgress 
                          variant="determinate" 
                          value={100} 
                          sx={{ 
                            flexGrow: 1,
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: unit.grade === 'D' ? '#8C52FF' : 
                                     unit.grade === 'M' ? '#FF52B4' : 
                                     unit.grade === 'P' ? '#52FFB4' : '#FF5252'
                            }
                          }}
                        />
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            <Box sx={{ display: selectedTab === 1 ? 'block' : 'none' }}>
              {optionalUnits.map((unit) => (
                <Accordion key={unit.id} sx={{ mb: 1, bgcolor: 'background.paper' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1 }}>
                      <Typography sx={{ flexGrow: 1 }}>
                        {unit.number}. {unit.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', minWidth: 100 }}>
                        {unit.credits} credits
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FormControl sx={{ minWidth: 120 }}>
                        <Select
                          value={unit.grade || ''}
                          onChange={(e) => handleGradeChange(unit.id, e.target.value as Grade)}
                          size="small"
                        >
                          <MenuItem value="D">Distinction</MenuItem>
                          <MenuItem value="M">Merit</MenuItem>
                          <MenuItem value="P">Pass</MenuItem>
                          <MenuItem value="U">Ungraded</MenuItem>
                        </Select>
                      </FormControl>
                      {unit.grade && (
                        <LinearProgress 
                          variant="determinate" 
                          value={100} 
                          sx={{ 
                            flexGrow: 1,
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: unit.grade === 'D' ? '#8C52FF' : 
                                     unit.grade === 'M' ? '#FF52B4' : 
                                     unit.grade === 'P' ? '#52FFB4' : '#FF5252'
                            }
                          }}
                        />
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                onClick={handleCalculate}
                size="large"
              >
                Calculate Grade
              </Button>
            </Box>
          </Paper>

          {result && (
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Results for {qualificationLevels[selectedLevel].name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Alert 
                  severity={result.overallGrade === 'U' ? 'error' : 'info'}
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiAlert-message': { fontSize: '1.1rem' }
                  }}
                >
                  Overall Grade: {result.overallGrade}
                </Alert>
                {!result.mandatoryUnitsComplete && (
                  <Alert severity="warning" sx={{ borderRadius: 2 }}>
                    Warning: Not all mandatory units are complete
                  </Alert>
                )}
                {!result.externalUnitsComplete && (
                  <Alert severity="warning" sx={{ borderRadius: 2 }}>
                    Warning: Not all external units are complete
                  </Alert>
                )}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                }}>
                  {[
                    { label: 'Total Credits', value: result.totalCredits, target: qualification.totalCredits },
                    { label: 'Pass Credits', value: result.passCredits, target: qualification.requiredPassCredits },
                    { label: 'Merit Credits', value: result.meritCredits, target: qualification.requiredMeritCredits },
                    { label: 'Distinction Credits', value: result.distinctionCredits, target: qualification.requiredDistinctionCredits }
                  ].map(({ label, value, target }) => (
                    <Box key={label} sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
                      <Typography sx={{ mb: 1 }}>{label}: {value} / {target}</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(value / target) * 100}
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.1)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: value >= target ? '#52FFB4' : '#FF52B4'
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BTECCalculator; 