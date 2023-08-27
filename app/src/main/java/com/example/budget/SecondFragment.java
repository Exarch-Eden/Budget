package com.example.budget;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import com.example.budget.databinding.FragmentSecondBinding;

public class SecondFragment extends Fragment {

    private FragmentSecondBinding binding;
//    private TextView myTextView = ((TextView) findViewById(R.id.textview_second));
    private int counter = 0;

    @Override
    public View onCreateView(
            LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState
    ) {

        binding = FragmentSecondBinding.inflate(inflater, container, false);
        return binding.getRoot();

    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        binding.buttonSecond.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                NavHostFragment.findNavController(SecondFragment.this)
//                        .navigate(R.id.action_SecondFragment_to_FirstFragment);
                counter++;
                Log.i("counter", (new Integer(counter)).toString());
                Log.i("view ", view.toString());
                Log.i("r.id", (new Integer(R.id.textview_second)).toString());
//                Log.i("found view", (view.getParent());
//                TextView myTextView = (TextView) findViewById(R.id.textview_second);
                TextView myTextView = binding.textviewSecond;
                myTextView.setText("Clicked " + counter + " times");
            }
        });
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}