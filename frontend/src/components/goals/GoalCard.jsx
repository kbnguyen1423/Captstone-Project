import { useState, useEffect } from 'react';

import { Card, CardContent, Typography, Tooltip, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ProgressDonut from './ProgressDonut';
import DescriptionDialog from '../dialog/DescriptionDialog';
import DeleteConfirmationDialog from '../dialog/DeleteConfirmationDialog';
import {TruncateText, TruncateHTML} from '../util/TruncateText';
import FormatDate from '../util/FormatDate';
import AddEditGoalDialog from './AddEditGoalDialog';


const GoalCard = ({ eventId, goal, handleDeleteGoal, setAllGoals }) => {
    const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState(null);
    const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(false);
    
    const MAX_DESCRIPTION_LENGTH = 100;
    const MAX_NAME_LENGTH = 32;

    useEffect(() => {
        checkDescriptionTruncated();
    }, [goal, goal.description]);

    const handleDescriptionClick = () => {
        setOpenDescriptionDialog(true);
    };

    const checkDescriptionTruncated = () => {
        const descriptionLength = goal.description ? goal.description.length : 0;
        setIsDescriptionTruncated(descriptionLength > MAX_DESCRIPTION_LENGTH);
    };

    const handleCloseDescriptionDialog = () => {
        setOpenDescriptionDialog(false);
    };
    
    const handleEditGoal = () => {
        setOpenEditDialog(true);
    };
    
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleOpenDeleteDialog = (goal) => {
        setGoalToDelete(goal.id);
        setOpenDeleteDialog(true);
    };
    
    const handleDeleteConfirmation = (goal) => {
        console.log(goal);
        handleDeleteGoal(goal.id);
        setOpenDeleteDialog(false);
        window.location.reload();
    };
    
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setGoalToDelete(null);
    };
    
    return (
        <Card sx={{ width: "250px", height: "250px" }}>
            <CardContent sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                <Tooltip title="Edit Properties" placement='top'>
                    <IconButton
                        sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }}
                        onClick={() => handleEditGoal(goal)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Goal">
                    <IconButton
                        sx={{ position: 'absolute', top: '48px', right: '8px', cursor: 'pointer' }}
                        onClick={() => handleOpenDeleteDialog(goal)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <ProgressDonut value={goal.progress} eventId={eventId} goal={goal} />
                <Typography variant="h7" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '10px'}}>
                    <TruncateText text={goal.name} maxLength={MAX_NAME_LENGTH}/>
                </Typography>
                {isDescriptionTruncated || (!goal.description || goal.description.replace(/<[^>]*>?/gm, '').trim() === '') ? (
                    <Tooltip title={isDescriptionTruncated ? "Expand Properties" : ""}>
                        <Typography onClick={() => handleDescriptionClick(goal.id)}
                            variant="caption" 
                            component="div" 
                            dangerouslySetInnerHTML={{ __html: TruncateHTML(goal.description, MAX_DESCRIPTION_LENGTH) }} 
                            sx={{ 
                                textAlign: 'center', 
                                paddingTop: '5px', 
                                cursor: 'pointer',
                                fontStyle: !goal.description ? 'italic' : 'normal',
                                color: !goal.description ? 'gray' : 'inherit'
                            }}
                        />
                    </Tooltip>
                ) : (
                    <Typography 
                        variant="caption" 
                        component="div" 
                        dangerouslySetInnerHTML={{ __html: TruncateHTML(goal.description, MAX_DESCRIPTION_LENGTH) }} 
                        sx={{ textAlign: 'center', paddingTop: '5px'}}
                    />
                )}
                {(!goal.description || goal.description.replace(/<[^>]*>?/gm, '').trim() === '') && (
                    <Typography 
                        variant="caption" 
                        component="div" 
                        sx={{ 
                            textAlign: 'center', 
                            paddingTop: '5px', 
                            fontStyle: 'italic', 
                            color: 'gray' 
                        }}
                    >
                        No Description
                    </Typography>
                )}
                <Typography variant="caption" sx={{ position: 'absolute', bottom: '8px', right: '8px'}}>
                    due: {FormatDate(goal.due_date, 'MM/DD/YYYY')}
                </Typography>
            </CardContent>
            <DescriptionDialog
                    isOpen={openDescriptionDialog && goal != null}
                    onClose={handleCloseDescriptionDialog}
                    description={goal && goal.description}
                    title={goal && goal.name}
            />
            <AddEditGoalDialog
                isOpen={openEditDialog}
                onClose={handleCloseEditDialog}
                eventId={eventId}
                setAllGoals={setAllGoals}
                goal={goal}
            />
            <DeleteConfirmationDialog
                isOpen={openDeleteDialog && goalToDelete === goal.id}
                onClose={handleCloseDeleteDialog}
                onDeleteConfirmation={() => handleDeleteConfirmation(goal)}
                name={goal && goal.name}
                objectName={"goal"}
            />
        </Card>
    );
};

export default GoalCard;
