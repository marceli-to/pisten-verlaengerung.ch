<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Statamic\Facades\Entry;
use Statamic\Fields\Value;
use App\Http\Requests\TestimonialStoreRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FormController extends Controller
{
  /**
   * @param TestimonialStoreRequest $request 
   * @return \Illuminate\Http\Response
   */
  public function storeTestimonial(TestimonialStoreRequest $request)
  { 
    // Create the title
    $title = $request->input('firstname') . ' ' . $request->input('name') . ', ' . $request->input('location');

    // Handle the image
    $image = $request->file('image');
    $image_name = Str::slug($title) . '-' . Str::random(16) . '.' . $image->getClientOriginalExtension();
    $path = $image->storeAs('testimonials', $image_name, 'assets');
    
    $testimonial = Entry::make()
      ->collection('testimonials')
      ->slug($title)
      ->data(
        array_merge(
          [
            'title' => $title,
            'image' => $path,
          ], 
          $request->except(
            ['image']
          )
        )
      );
    $testimonial->save();
    return response()->json($testimonial->id, 201);
  }

}
